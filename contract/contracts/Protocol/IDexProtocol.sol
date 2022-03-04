pragma solidity ^0.6.0;

interface IDexProtocol {
    function router() external view returns (address);
    function safeSwapBNB(address toToken, bool withdraw) external payable;
    function safeSwapBEP(uint256 inAmount, address fromToken, address toToken, bool withdraw) external;
    function estimate(uint256 amount, address fromToken, address toToken) external view returns (uint256);
    function getTokens(address pool) external view returns (address, address);
}