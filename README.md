# Decipher-PendingSwap

## Frontend

### Pages ( DONE, TODO )

Randing (/main)

- Buttons
- OrderBankInfo

Maker (/maker)

- OrderComponent - OrderMaking ( fromToken, fromAmount, toToken, toAmount, fee 등을 추가하고 makeOrder 호출)
- Chart ( from token, to token 설정시 해당 swap 에 대한 누적 order의 차트 )
- Table ( maker 가 생성한 order의 전체 리스트 cancel 버튼으로 cancelOrder 호출 )

Taker (/taker)

- Filter Modal ( availability, minProfit, maxProfit, fromToken, toToken )
- Table, Pagination ( Filter에 따른 전체 order들을 표시, order 클릭시 해당 order에 대한 상세 모달을 띄우고, 버튼으로 takeOrder 호출 )

Transaction History (/history)

- maker history
- taker history

My Page (/myPage)

- account 에 따라 해당 지갑 주소의 summary 를 표시 ( DB 의 값을 B/E 에 요청해 처리 )

### Hooks ( DONE, TODO )

Randing

- orderBankInfo : B/E 에서 TVL, Total Order/24hr, Pending Order/24hr, Completed Order/24hr

Maker

- OrderComponent
- Chart ( fromToken, toToken 에 따라 pending 중인 order 들의 통계를 보여줌 ) - OrderBankViewerContract 에서 값을 가져옴
- Table ( signin 된 account 에서 생성된 pending 중인 order들을 가져와서 보여줌 ) - OrderBankViewerContract 에서 값을 가져옴

Taker

- Table, Pagination ( filter 값을 바탕으로 order를 table로 처리하여 보여줌 ) - B/E api 를 통해 값을 가져옴

Transaction History

- maker ( 해당 account 에서 생성한 order를 리스트로 관리하여 completed, canceled, pending 3가지 status로 관리해서 보여줌 상당부분 Maker Table과 유사 ) - OrderBankViewerContract 에서 값을 가져옴
- taker ( 해당 account 에서 처리한 order를 리스트로 관리하여 보여줌 ) - B/E api 에서 값을 가져옴 ( profit 을 보여주어야 하므로 가격 계산에 대한 로직이 필요하기 때문 )

My Page

- 해당 account 의 orderbank 사용 summary - B/E api 에서 값을 가져옴 ( profit 을 보여주어야 하므로 가격 계산에 대한 로직이 필요하기 때문 )

## Backend

1. a.24개의 토큰들을 중심 토큰 7개, b.BNB 부속 토큰, c.BUSD 부속 토큰으로 나눔. from token이 b,c 그룹이면 곧바로 각각 BNB, BUSD로 교환

2. 이제 모든 토큰이 중심 토큰 7개라고 가정할 수 있음. 이 7개만을 가지고 최적 경로를 탐색함. 어떻게?

재귀문을 돌려서, (1)이전 토큰이 들어있고, (2)지금까지의 경로에 없었던 LP를 찾아서 교환하고 산출량을 저장. to token에 도달하면 while문 종료.

이렇게 찾은 to token 산출량 중에서 가장 산출량이 큰 경로를 채택.
