pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "../Protocol/PancakeSwap/IPancakeFactory.sol";
import "../Protocol/PancakeSwap/IPancakePair.sol";

interface IERC20 {
    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function balanceOf(address account) external view returns (uint256);
    function totalSupply() external view returns (uint256);
}

contract PoolViewer {

    struct PoolInfo {
        address pool;
        address token0;
        address token1;
        uint112 token0Reserve;
        uint112 token1Reserve;
        string token0Name;
        string token1Name;
        string token0Symbol;
        string token1Symbol;
        uint8 token0Decimals;
        uint8 token1Decimals;
    }

    function poolInfos(
        address factoryAddress,
        uint256 offset,
        uint256 limit
    ) public view returns (
        PoolInfo[] memory poolInfoList, 
        uint256 count,
        uint256 total
    ) {
        IPancakeFactory factory = IPancakeFactory(factoryAddress);

        total = factory.allPairsLength();
        count = limit <= total-offset? limit: total-offset;

        poolInfoList = new PoolInfo[](count);

        for(uint256 i=0; i<count; i++) {
            address pool = factory.allPairs(offset+i);
            IPancakePair pair = IPancakePair(pool);

            address token0 = pair.token0();
            address token1 = pair.token1();
            (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast) = pair.getReserves();

            poolInfoList[i] = PoolInfo({
                pool: pool,
                token0: token0,
                token1: token1,
                token0Reserve: reserve0,
                token1Reserve: reserve1,
                token0Name: IERC20(token0).name(),
                token1Name: IERC20(token1).name(),
                token0Symbol: IERC20(token0).symbol(),
                token1Symbol: IERC20(token1).symbol(),
                token0Decimals: IERC20(token0).decimals(),
                token1Decimals: IERC20(token1).decimals()
            });
        }
    }

    function poolInfosByList(
        address[] calldata pools
    ) public view returns (
        PoolInfo[] memory poolInfoList
    ) {
        uint256 count = pools.length;
        poolInfoList = new PoolInfo[](count);

        for(uint256 i=0; i<count; i++) {
            address pool = pools[i];
            IPancakePair pair = IPancakePair(pool);

            address token0 = pair.token0();
            address token1 = pair.token1();
            (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast) = pair.getReserves();

            poolInfoList[i] = PoolInfo({
                pool: pool,
                token0: token0,
                token1: token1,
                token0Reserve: reserve0,
                token1Reserve: reserve1,
                token0Name: IERC20(token0).name(),
                token1Name: IERC20(token1).name(),
                token0Symbol: IERC20(token0).symbol(),
                token1Symbol: IERC20(token1).symbol(),
                token0Decimals: IERC20(token0).decimals(),
                token1Decimals: IERC20(token1).decimals()
            });
        }
    }

}