export const orderBankAddress = '0x0B0E70CDD671aB9538bb7D64e9630dA346e44F86'

export const orderBankViewerAddress = '0xE19dA48CC0980562b0AA11c1A99cc4409a1212A7'

// export const orderBankAbi = [
// 	'function takeOrder(uint256 oid, address[] path, address[] protocols) public nonpayable',
// 	'function cancelOrder(uint256 oid) public nonpayable',
// 	'function makeOrder(address fromToken, address toToken, uint256 fromAmount, uint256 toAmount, uint256 feeAmount) public payable',
// ];
export const orderBankAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'oid',
        type: 'uint256',
      },
    ],
    name: 'CancelOrder',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'oid',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'fromToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'toToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fromAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'toAmount',
        type: 'uint256',
      },
    ],
    name: 'MakeOrder',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'oid',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'fromToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'toToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fromAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'toAmount',
        type: 'uint256',
      },
    ],
    name: 'TakeOrder',
    type: 'event',
  },
  {
    inputs: [],
    name: 'BNB',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'allOrders',
    outputs: [
      {
        internalType: 'enum OrderBank.Status',
        name: 'status',
        type: 'uint8',
      },
      {
        internalType: 'address payable',
        name: 'maker',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: 'taker',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'fromToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'toToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'fromAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'toAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'outAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'positiveSlippage',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'orderedAt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'updatedAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'feeToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'makerOrders',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'takerOrders',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'totalCanceled',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'totalCompleted',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'totalMakerEarned',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'totalPending',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'totalTakerEarned',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
    payable: true,
  },
  {
    inputs: [],
    name: 'allOrdersLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'makerOrdersLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'takerOrdersLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'fromToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'toToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'fromAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'toAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'feeAmount',
        type: 'uint256',
      },
    ],
    name: 'makeOrder',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'oid',
        type: 'uint256',
      },
    ],
    name: 'cancelOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'oid',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: 'protocols',
        type: 'address[]',
      },
    ],
    name: 'takeOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const orderBankViewerAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_orderBank',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'orderBank',
    outputs: [
      {
        internalType: 'contract IOrderBank',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'getOrderBankInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'allOrdersLength',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalPending',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalCompleted',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalCanceled',
            type: 'uint256',
          },
        ],
        internalType: 'struct OrderBankViewer.OrderBankInfo',
        name: 'orderBankInfo',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
      {
        internalType: 'enum IOrderBank.Status',
        name: 'status',
        type: 'uint8',
      },
    ],
    name: 'getTotalOrderList',
    outputs: [
      {
        components: [
          {
            internalType: 'enum IOrderBank.Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'address payable',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'fromToken',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'toToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'fromAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'toAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'outAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'positiveSlippage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'orderedAt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'updatedAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct IOrderBank.OrderInfo[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'totalOrder',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastOffset',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
      {
        internalType: 'enum IOrderBank.Status',
        name: 'status',
        type: 'uint8',
      },
    ],
    name: 'getMakerOrderList',
    outputs: [
      {
        components: [
          {
            internalType: 'enum IOrderBank.Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'address payable',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'fromToken',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'toToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'fromAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'toAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'outAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'positiveSlippage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'orderedAt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'updatedAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct IOrderBank.OrderInfo[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'totalOrder',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastOffset',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
    ],
    name: 'getTakerOrderList',
    outputs: [
      {
        components: [
          {
            internalType: 'enum IOrderBank.Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'address payable',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'fromToken',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'toToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'fromAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'toAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'outAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'positiveSlippage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'orderedAt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'updatedAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct IOrderBank.OrderInfo[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'totalOrder',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastOffset',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
]
