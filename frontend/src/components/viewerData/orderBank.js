module.exports = {
  address: '0x0B0E70CDD671aB9538bb7D64e9630dA346e44F86',
  abi: [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'oid',
          type: 'uint256',
        },
      ],
      name: 'allOrders',
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
          internalType: 'struct IOrderBank.OrderInfo',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
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
          name: 'index',
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
          name: 'index',
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
    },
  ],
}
