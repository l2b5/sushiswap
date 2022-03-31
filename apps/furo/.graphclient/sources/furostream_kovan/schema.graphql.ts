import { buildSchema, Source } from 'graphql';

const source = new Source(/* GraphQL */`
schema {
  query: Query
  subscription: Subscription
}

"Marks the GraphQL type as indexable entity.  Each type that should be an entity is required to be annotated with this directive."
directive @entity on OBJECT

"Defined a Subgraph ID for an object type"
directive @subgraphId(id: String!) on OBJECT

"creates a virtual field on the entity that may be queried but cannot be set manually through the mappings API."
directive @derivedFrom(field: String!) on FIELD_DEFINITION

scalar BigDecimal

scalar BigInt

"""The block at which the query should be executed."""
input Block_height {
  """Value containing a block hash"""
  hash: Bytes
  """Value containing a block number"""
  number: Int
  """
  Value containing the minimum block number. 
  In the case of \`number_gte\`, the query will be executed on the latest block only if
  the subgraph has progressed to or past the minimum block number.
  Defaults to the latest block when omitted.
  
  """
  number_gte: Int
}

scalar Bytes

type Furo {
  id: ID!
  streamCount: BigInt!
  userCount: BigInt!
  transactionCount: BigInt!
}

input Furo_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  streamCount: BigInt
  streamCount_not: BigInt
  streamCount_gt: BigInt
  streamCount_lt: BigInt
  streamCount_gte: BigInt
  streamCount_lte: BigInt
  streamCount_in: [BigInt!]
  streamCount_not_in: [BigInt!]
  userCount: BigInt
  userCount_not: BigInt
  userCount_gt: BigInt
  userCount_lt: BigInt
  userCount_gte: BigInt
  userCount_lte: BigInt
  userCount_in: [BigInt!]
  userCount_not_in: [BigInt!]
  transactionCount: BigInt
  transactionCount_not: BigInt
  transactionCount_gt: BigInt
  transactionCount_lt: BigInt
  transactionCount_gte: BigInt
  transactionCount_lte: BigInt
  transactionCount_in: [BigInt!]
  transactionCount_not_in: [BigInt!]
}

enum Furo_orderBy {
  id
  streamCount
  userCount
  transactionCount
}

"""Defines the order direction, either ascending or descending"""
enum OrderDirection {
  asc
  desc
}

type Query {
  furo(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Furo
  furos(
    skip: Int = 0
    first: Int = 100
    orderBy: Furo_orderBy
    orderDirection: OrderDirection
    where: Furo_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Furo!]!
  stream(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Stream
  streams(
    skip: Int = 0
    first: Int = 100
    orderBy: Stream_orderBy
    orderDirection: OrderDirection
    where: Stream_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Stream!]!
  transaction(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Transaction
  transactions(
    skip: Int = 0
    first: Int = 100
    orderBy: Transaction_orderBy
    orderDirection: OrderDirection
    where: Transaction_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Transaction!]!
  token(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Token
  tokens(
    skip: Int = 0
    first: Int = 100
    orderBy: Token_orderBy
    orderDirection: OrderDirection
    where: Token_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Token!]!
  user(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): User
  users(
    skip: Int = 0
    first: Int = 100
    orderBy: User_orderBy
    orderDirection: OrderDirection
    where: User_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [User!]!
  """Access to subgraph metadata"""
  _meta(block: Block_height): _Meta_
}

type Stream {
  id: ID!
  recipient: User!
  amount: BigInt!
  withdrawnAmount: BigInt!
  token: Token!
  status: StreamStatus!
  createdBy: User!
  fromBentoBox: Boolean!
  startedAt: BigInt!
  expiresAt: BigInt!
  transactionCount: BigInt!
  createdAtBlock: BigInt!
  createdAtTimestamp: BigInt!
  modifiedAtBlock: BigInt!
  modifiedAtTimestamp: BigInt!
}

enum StreamStatus {
  ACTIVE
  EXTENDED
  CANCELLED
  EXPIRED
}

input Stream_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  recipient: String
  recipient_not: String
  recipient_gt: String
  recipient_lt: String
  recipient_gte: String
  recipient_lte: String
  recipient_in: [String!]
  recipient_not_in: [String!]
  recipient_contains: String
  recipient_contains_nocase: String
  recipient_not_contains: String
  recipient_not_contains_nocase: String
  recipient_starts_with: String
  recipient_starts_with_nocase: String
  recipient_not_starts_with: String
  recipient_not_starts_with_nocase: String
  recipient_ends_with: String
  recipient_ends_with_nocase: String
  recipient_not_ends_with: String
  recipient_not_ends_with_nocase: String
  amount: BigInt
  amount_not: BigInt
  amount_gt: BigInt
  amount_lt: BigInt
  amount_gte: BigInt
  amount_lte: BigInt
  amount_in: [BigInt!]
  amount_not_in: [BigInt!]
  withdrawnAmount: BigInt
  withdrawnAmount_not: BigInt
  withdrawnAmount_gt: BigInt
  withdrawnAmount_lt: BigInt
  withdrawnAmount_gte: BigInt
  withdrawnAmount_lte: BigInt
  withdrawnAmount_in: [BigInt!]
  withdrawnAmount_not_in: [BigInt!]
  token: String
  token_not: String
  token_gt: String
  token_lt: String
  token_gte: String
  token_lte: String
  token_in: [String!]
  token_not_in: [String!]
  token_contains: String
  token_contains_nocase: String
  token_not_contains: String
  token_not_contains_nocase: String
  token_starts_with: String
  token_starts_with_nocase: String
  token_not_starts_with: String
  token_not_starts_with_nocase: String
  token_ends_with: String
  token_ends_with_nocase: String
  token_not_ends_with: String
  token_not_ends_with_nocase: String
  status: StreamStatus
  status_not: StreamStatus
  status_in: [StreamStatus!]
  status_not_in: [StreamStatus!]
  createdBy: String
  createdBy_not: String
  createdBy_gt: String
  createdBy_lt: String
  createdBy_gte: String
  createdBy_lte: String
  createdBy_in: [String!]
  createdBy_not_in: [String!]
  createdBy_contains: String
  createdBy_contains_nocase: String
  createdBy_not_contains: String
  createdBy_not_contains_nocase: String
  createdBy_starts_with: String
  createdBy_starts_with_nocase: String
  createdBy_not_starts_with: String
  createdBy_not_starts_with_nocase: String
  createdBy_ends_with: String
  createdBy_ends_with_nocase: String
  createdBy_not_ends_with: String
  createdBy_not_ends_with_nocase: String
  fromBentoBox: Boolean
  fromBentoBox_not: Boolean
  fromBentoBox_in: [Boolean!]
  fromBentoBox_not_in: [Boolean!]
  startedAt: BigInt
  startedAt_not: BigInt
  startedAt_gt: BigInt
  startedAt_lt: BigInt
  startedAt_gte: BigInt
  startedAt_lte: BigInt
  startedAt_in: [BigInt!]
  startedAt_not_in: [BigInt!]
  expiresAt: BigInt
  expiresAt_not: BigInt
  expiresAt_gt: BigInt
  expiresAt_lt: BigInt
  expiresAt_gte: BigInt
  expiresAt_lte: BigInt
  expiresAt_in: [BigInt!]
  expiresAt_not_in: [BigInt!]
  transactionCount: BigInt
  transactionCount_not: BigInt
  transactionCount_gt: BigInt
  transactionCount_lt: BigInt
  transactionCount_gte: BigInt
  transactionCount_lte: BigInt
  transactionCount_in: [BigInt!]
  transactionCount_not_in: [BigInt!]
  createdAtBlock: BigInt
  createdAtBlock_not: BigInt
  createdAtBlock_gt: BigInt
  createdAtBlock_lt: BigInt
  createdAtBlock_gte: BigInt
  createdAtBlock_lte: BigInt
  createdAtBlock_in: [BigInt!]
  createdAtBlock_not_in: [BigInt!]
  createdAtTimestamp: BigInt
  createdAtTimestamp_not: BigInt
  createdAtTimestamp_gt: BigInt
  createdAtTimestamp_lt: BigInt
  createdAtTimestamp_gte: BigInt
  createdAtTimestamp_lte: BigInt
  createdAtTimestamp_in: [BigInt!]
  createdAtTimestamp_not_in: [BigInt!]
  modifiedAtBlock: BigInt
  modifiedAtBlock_not: BigInt
  modifiedAtBlock_gt: BigInt
  modifiedAtBlock_lt: BigInt
  modifiedAtBlock_gte: BigInt
  modifiedAtBlock_lte: BigInt
  modifiedAtBlock_in: [BigInt!]
  modifiedAtBlock_not_in: [BigInt!]
  modifiedAtTimestamp: BigInt
  modifiedAtTimestamp_not: BigInt
  modifiedAtTimestamp_gt: BigInt
  modifiedAtTimestamp_lt: BigInt
  modifiedAtTimestamp_gte: BigInt
  modifiedAtTimestamp_lte: BigInt
  modifiedAtTimestamp_in: [BigInt!]
  modifiedAtTimestamp_not_in: [BigInt!]
}

enum Stream_orderBy {
  id
  recipient
  amount
  withdrawnAmount
  token
  status
  createdBy
  fromBentoBox
  startedAt
  expiresAt
  transactionCount
  createdAtBlock
  createdAtTimestamp
  modifiedAtBlock
  modifiedAtTimestamp
}

type Subscription {
  furo(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Furo
  furos(
    skip: Int = 0
    first: Int = 100
    orderBy: Furo_orderBy
    orderDirection: OrderDirection
    where: Furo_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Furo!]!
  stream(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Stream
  streams(
    skip: Int = 0
    first: Int = 100
    orderBy: Stream_orderBy
    orderDirection: OrderDirection
    where: Stream_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Stream!]!
  transaction(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Transaction
  transactions(
    skip: Int = 0
    first: Int = 100
    orderBy: Transaction_orderBy
    orderDirection: OrderDirection
    where: Transaction_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Transaction!]!
  token(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Token
  tokens(
    skip: Int = 0
    first: Int = 100
    orderBy: Token_orderBy
    orderDirection: OrderDirection
    where: Token_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Token!]!
  user(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): User
  users(
    skip: Int = 0
    first: Int = 100
    orderBy: User_orderBy
    orderDirection: OrderDirection
    where: User_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [User!]!
  """Access to subgraph metadata"""
  _meta(block: Block_height): _Meta_
}

type Token {
  id: ID!
  symbol: String!
  symbolSuccess: Boolean!
  name: String!
  nameSuccess: Boolean!
  decimals: BigInt!
  decimalsSuccess: Boolean!
  createdAtBlock: BigInt!
  createdAtTimestamp: BigInt!
}

input Token_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  symbol: String
  symbol_not: String
  symbol_gt: String
  symbol_lt: String
  symbol_gte: String
  symbol_lte: String
  symbol_in: [String!]
  symbol_not_in: [String!]
  symbol_contains: String
  symbol_contains_nocase: String
  symbol_not_contains: String
  symbol_not_contains_nocase: String
  symbol_starts_with: String
  symbol_starts_with_nocase: String
  symbol_not_starts_with: String
  symbol_not_starts_with_nocase: String
  symbol_ends_with: String
  symbol_ends_with_nocase: String
  symbol_not_ends_with: String
  symbol_not_ends_with_nocase: String
  symbolSuccess: Boolean
  symbolSuccess_not: Boolean
  symbolSuccess_in: [Boolean!]
  symbolSuccess_not_in: [Boolean!]
  name: String
  name_not: String
  name_gt: String
  name_lt: String
  name_gte: String
  name_lte: String
  name_in: [String!]
  name_not_in: [String!]
  name_contains: String
  name_contains_nocase: String
  name_not_contains: String
  name_not_contains_nocase: String
  name_starts_with: String
  name_starts_with_nocase: String
  name_not_starts_with: String
  name_not_starts_with_nocase: String
  name_ends_with: String
  name_ends_with_nocase: String
  name_not_ends_with: String
  name_not_ends_with_nocase: String
  nameSuccess: Boolean
  nameSuccess_not: Boolean
  nameSuccess_in: [Boolean!]
  nameSuccess_not_in: [Boolean!]
  decimals: BigInt
  decimals_not: BigInt
  decimals_gt: BigInt
  decimals_lt: BigInt
  decimals_gte: BigInt
  decimals_lte: BigInt
  decimals_in: [BigInt!]
  decimals_not_in: [BigInt!]
  decimalsSuccess: Boolean
  decimalsSuccess_not: Boolean
  decimalsSuccess_in: [Boolean!]
  decimalsSuccess_not_in: [Boolean!]
  createdAtBlock: BigInt
  createdAtBlock_not: BigInt
  createdAtBlock_gt: BigInt
  createdAtBlock_lt: BigInt
  createdAtBlock_gte: BigInt
  createdAtBlock_lte: BigInt
  createdAtBlock_in: [BigInt!]
  createdAtBlock_not_in: [BigInt!]
  createdAtTimestamp: BigInt
  createdAtTimestamp_not: BigInt
  createdAtTimestamp_gt: BigInt
  createdAtTimestamp_lt: BigInt
  createdAtTimestamp_gte: BigInt
  createdAtTimestamp_lte: BigInt
  createdAtTimestamp_in: [BigInt!]
  createdAtTimestamp_not_in: [BigInt!]
}

enum Token_orderBy {
  id
  symbol
  symbolSuccess
  name
  nameSuccess
  decimals
  decimalsSuccess
  createdAtBlock
  createdAtTimestamp
}

type Transaction {
  id: ID!
  type: TransactionType
  stream: Stream!
  amount: BigInt!
  to: User!
  token: Token!
  toBentoBox: Boolean!
  createdAtBlock: BigInt!
  createdAtTimestamp: BigInt!
}

enum TransactionType {
  DEPOSIT
  EXTEND
  WITHDRAWAL
  DISBURSEMENT
}

input Transaction_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  type: TransactionType
  type_not: TransactionType
  type_in: [TransactionType!]
  type_not_in: [TransactionType!]
  stream: String
  stream_not: String
  stream_gt: String
  stream_lt: String
  stream_gte: String
  stream_lte: String
  stream_in: [String!]
  stream_not_in: [String!]
  stream_contains: String
  stream_contains_nocase: String
  stream_not_contains: String
  stream_not_contains_nocase: String
  stream_starts_with: String
  stream_starts_with_nocase: String
  stream_not_starts_with: String
  stream_not_starts_with_nocase: String
  stream_ends_with: String
  stream_ends_with_nocase: String
  stream_not_ends_with: String
  stream_not_ends_with_nocase: String
  amount: BigInt
  amount_not: BigInt
  amount_gt: BigInt
  amount_lt: BigInt
  amount_gte: BigInt
  amount_lte: BigInt
  amount_in: [BigInt!]
  amount_not_in: [BigInt!]
  to: String
  to_not: String
  to_gt: String
  to_lt: String
  to_gte: String
  to_lte: String
  to_in: [String!]
  to_not_in: [String!]
  to_contains: String
  to_contains_nocase: String
  to_not_contains: String
  to_not_contains_nocase: String
  to_starts_with: String
  to_starts_with_nocase: String
  to_not_starts_with: String
  to_not_starts_with_nocase: String
  to_ends_with: String
  to_ends_with_nocase: String
  to_not_ends_with: String
  to_not_ends_with_nocase: String
  token: String
  token_not: String
  token_gt: String
  token_lt: String
  token_gte: String
  token_lte: String
  token_in: [String!]
  token_not_in: [String!]
  token_contains: String
  token_contains_nocase: String
  token_not_contains: String
  token_not_contains_nocase: String
  token_starts_with: String
  token_starts_with_nocase: String
  token_not_starts_with: String
  token_not_starts_with_nocase: String
  token_ends_with: String
  token_ends_with_nocase: String
  token_not_ends_with: String
  token_not_ends_with_nocase: String
  toBentoBox: Boolean
  toBentoBox_not: Boolean
  toBentoBox_in: [Boolean!]
  toBentoBox_not_in: [Boolean!]
  createdAtBlock: BigInt
  createdAtBlock_not: BigInt
  createdAtBlock_gt: BigInt
  createdAtBlock_lt: BigInt
  createdAtBlock_gte: BigInt
  createdAtBlock_lte: BigInt
  createdAtBlock_in: [BigInt!]
  createdAtBlock_not_in: [BigInt!]
  createdAtTimestamp: BigInt
  createdAtTimestamp_not: BigInt
  createdAtTimestamp_gt: BigInt
  createdAtTimestamp_lt: BigInt
  createdAtTimestamp_gte: BigInt
  createdAtTimestamp_lte: BigInt
  createdAtTimestamp_in: [BigInt!]
  createdAtTimestamp_not_in: [BigInt!]
}

enum Transaction_orderBy {
  id
  type
  stream
  amount
  to
  token
  toBentoBox
  createdAtBlock
  createdAtTimestamp
}

type User {
  id: ID!
  revenueStreams(skip: Int = 0, first: Int = 100, orderBy: Stream_orderBy, orderDirection: OrderDirection, where: Stream_filter): [Stream!]!
  createdStreams(skip: Int = 0, first: Int = 100, orderBy: Stream_orderBy, orderDirection: OrderDirection, where: Stream_filter): [Stream!]!
  createdAtBlock: BigInt!
  createdAtTimestamp: BigInt!
}

input User_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  createdAtBlock: BigInt
  createdAtBlock_not: BigInt
  createdAtBlock_gt: BigInt
  createdAtBlock_lt: BigInt
  createdAtBlock_gte: BigInt
  createdAtBlock_lte: BigInt
  createdAtBlock_in: [BigInt!]
  createdAtBlock_not_in: [BigInt!]
  createdAtTimestamp: BigInt
  createdAtTimestamp_not: BigInt
  createdAtTimestamp_gt: BigInt
  createdAtTimestamp_lt: BigInt
  createdAtTimestamp_gte: BigInt
  createdAtTimestamp_lte: BigInt
  createdAtTimestamp_in: [BigInt!]
  createdAtTimestamp_not_in: [BigInt!]
}

enum User_orderBy {
  id
  revenueStreams
  createdStreams
  createdAtBlock
  createdAtTimestamp
}

type _Block_ {
  """The hash of the block"""
  hash: Bytes
  """The block number"""
  number: Int!
}

"""The type for the top-level _meta field"""
type _Meta_ {
  """
  Information about a specific subgraph block. The hash of the block
  will be null if the _meta field has a block constraint that asks for
  a block number. It will be filled if the _meta field has no block constraint
  and therefore asks for the latest  block
  
  """
  block: _Block_!
  """The deployment ID"""
  deployment: String!
  """If \`true\`, the subgraph encountered indexing errors at some past block"""
  hasIndexingErrors: Boolean!
}

enum _SubgraphErrorPolicy_ {
  """Data will be returned even if the subgraph has indexing errors"""
  allow
  """
  If the subgraph has indexing errors, data will be omitted. The default.
  """
  deny
}
`, `.graphclient/sources/furostream_kovan/schema.graphql`);

export default buildSchema(source, {
  assumeValid: true,
  assumeValidSDL: true
});