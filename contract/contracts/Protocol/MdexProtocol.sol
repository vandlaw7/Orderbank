pragma solidity ^0.6.0;

import '@pancakeswap/pancake-swap-lib/contracts/math/SafeMath.sol';
import '@pancakeswap/pancake-swap-lib/contracts/token/BEP20/IBEP20.sol';

import "./PancakeSwap/IPancakeRouter01.sol";
import "./PancakeSwap/IPancakeFactory.sol";
import "./PancakeSwap/IPancakePair.sol";
import "./IDexProtocol.sol";

contract MdexProtocol is IDexProtocol{
    using SafeMath for uint256;

    address public factory = address(0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8);
    address public _router = address(0x7DAe51BD3E3376B8c7c4900E9107f12Be3AF1bA8);
    address constant public wBNB = address(0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c);
    address constant public BNB = address(0);

    mapping(address=>mapping(address=>bool)) private _approveTo;

    receive () payable external {}

    function router() public override view returns(address) {
        return _router;
    }

    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) internal pure returns (uint256 amountOut) {
        require(amountIn > 0, 'INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'INSUFFICIENT_LIQUIDITY');
        uint256 amountInWithFee = amountIn.mul(9980);
        uint256 numerator = amountInWithFee.mul(reserveOut);
        uint256 denominator = reserveIn.mul(10000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }

    function estimate(uint256 amount, address fromToken, address toToken) external view override returns (uint256) {
        address pool = IPancakeFactory(factory).getPair(fromToken==BNB?wBNB:fromToken, toToken==BNB?wBNB:toToken);
        address token0 = IPancakePair(pool).token0();
        //address token1 = IPancakePair(pool).token1();

        (uint112 reserve0, uint112 reserve1, ) = IPancakePair(pool).getReserves();

        token0 = (token0 == wBNB)? BNB:token0;
        uint256 reserveIn = fromToken == token0? uint256(reserve0):uint256(reserve1);
        uint256 reserveOut = fromToken == token0? uint256(reserve1):uint256(reserve0);

        return getAmountOut(amount, reserveIn, reserveOut);
    }

    function safeSwapBNB(address toToken, bool withdraw) public override payable {
        uint256 amount = (payable(address(this))).balance;

        address[] memory path = new address[](2);
        path[0] = wBNB;
        path[1] = toToken;

        IPancakeRouter01(_router).swapExactETHForTokens{value: amount}(0, path, address(this), now.add(600));

        if(withdraw){
            uint256 outAmount = IBEP20(toToken).balanceOf(address(this));
            IBEP20(toToken).transfer(msg.sender, outAmount);
        }
    }

    function safeSwapBEP(uint256 inAmount, address fromToken, address toToken, bool withdraw) public override {
        if(inAmount > 0)
            IBEP20(fromToken).transferFrom(msg.sender, address(this), inAmount);

        uint256 amount = IBEP20(fromToken).balanceOf(address(this));

        _approveToken(router(), fromToken);

        address[] memory path = new address[](2);
        path[0] = fromToken;
        path[1] = toToken == BNB? wBNB:toToken;

        if(toToken == BNB)
            IPancakeRouter01(_router).swapExactTokensForETH(amount, 0, path, address(this), now.add(600));
        else
            IPancakeRouter01(_router).swapExactTokensForTokens(amount, 0, path, address(this), now.add(600));

        if(withdraw){
            uint256 outAmount = toToken == BNB? (payable(address(this))).balance : IBEP20(toToken).balanceOf(address(this));
            if(toToken == BNB)
                msg.sender.transfer(outAmount);
            else
                IBEP20(toToken).transfer(msg.sender, outAmount);
        }
    }

    function getTokens(address pool) external view override returns (address, address) {
        address tokenA = IPancakePair(pool).token0();
        address tokenB = IPancakePair(pool).token1();

        return (tokenA==wBNB?BNB:tokenA, tokenB==wBNB?BNB:tokenB);
    }

    function _approveToken(address pool, address token) internal {
        if(token != BNB && !_approveTo[pool][token]) {
            IBEP20(token).approve(pool, uint256(-1));
            _approveTo[pool][token] = true;
        }
    }
}