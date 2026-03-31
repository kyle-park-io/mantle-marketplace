interface ItemGuide {
  whenToUse: string[];
  whatItDoes: string[];
}

export const ITEM_GUIDES: Record<string, ItemGuide> = {
  // Skills
  'mantle-network-primer': {
    whenToUse: [
      'Starting Mantle development and need to understand the basics',
      'Confused about MNT gas, chain ID, or L2 finality',
      'Need official RPC endpoints, explorer links, or network config',
      'Asking "How is Mantle different from other chains?"',
    ],
    whatItDoes: [
      'Explains core Mantle concepts: MNT gas, chain ID 5000/5003, L2 vs L1 finality',
      'Separates stable concepts from time-sensitive snapshot info',
      'Flags live-check items (fees, block time, latest architecture)',
    ],
  },
  'mantle-address-registry-navigator': {
    whenToUse: [
      'Verifying a contract or token address before a DeFi action',
      'Checking if a given address is legitimate (anti-phishing)',
      'Looking up a token address by symbol (e.g. USDT)',
      'Fetching bridge, DEX router, or protocol addresses safely',
    ],
    whatItDoes: [
      'Resolves addresses via MCP tools → local registry → BLOCKED if not found',
      'Never guesses or generates addresses',
      'Returns trust level: high / medium / low / none',
      'Flags deprecated or paused contracts as non-executable',
    ],
  },
  'mantle-risk-evaluator': {
    whenToUse: [
      'Before executing a swap, LP, or lending transaction',
      'Checking slippage, gas, and address safety in one shot',
      'As a final safety gate before approving a DeFi plan',
    ],
    whatItDoes: [
      'Checks 5 items: slippage, price impact, address safety, allowance scope, gas/deadline',
      'Returns pass / warn / block verdict',
      'Blocks execution if any item fails',
    ],
  },
  'mantle-portfolio-analyst': {
    whenToUse: [
      'Checking all MNT + ERC-20 balances for a wallet',
      'Auditing DeFi approvals and allowance exposure',
      'Finding unlimited approvals before a security review',
    ],
    whatItDoes: [
      'Read-only: getBalance, getTokenBalances, getAllowances',
      'Classifies allowance risk: low / medium / high / critical',
      'Highlights critical (unlimited) approvals at the top of the report',
    ],
  },
  'mantle-data-indexer': {
    whenToUse: [
      'Querying historical swap or transaction history for a wallet',
      'Analyzing DEX volume, TVL, or protocol stats over time',
      'Fetching data via subgraph (GraphQL) or SQL indexer',
    ],
    whatItDoes: [
      'Converts relative time ("last 7 days") to absolute UTC timestamps',
      'Queries subgraphs via mantle_querySubgraph or SQL via mantle_queryIndexerSql',
      'Never guesses endpoint URLs — returns BLOCKED if not provided',
      'Discloses indexer lag when present',
    ],
  },
  'mantle-readonly-debugger': {
    whenToUse: [
      'RPC call is failing or connection is dropping',
      'eth_call is reverting or a quote API returns an error',
      'Balance looks wrong or nonce seems off',
      'Something failed in the read phase before execution',
    ],
    whatItDoes: [
      'Classifies errors: RPC transport, on-chain revert, quote failure, balance/nonce mismatch',
      'Preserves the original error string — never paraphrases',
      'Suggests the smallest reversible diagnostic step first',
    ],
  },
  'mantle-tx-simulator': {
    whenToUse: [
      'Previewing what a transaction will do before signing',
      'Understanding exactly what you give and receive in a swap (WYSIWYS)',
      'Analyzing revert reasons or estimating gas',
      'Reviewing multi-step bundles (approve + swap)',
    ],
    whatItDoes: [
      'Generates a simulation handoff package for an external backend',
      'Always produces a WYSIWYS summary: plain-language outcome, assets in/out',
      'Sets do_not_execute if simulation fails, with reason',
    ],
  },
  'mantle-defi-operator': {
    whenToUse: [
      'Planning a full DeFi flow: swap, LP add/remove, or lending',
      'Comparing which DEX or protocol gives the best outcome',
      'Orchestrating address verification + risk check + portfolio review in one go',
    ],
    whatItDoes: [
      '3 modes: discovery_only, compare_only, execution_ready',
      'Orchestrates: address registry → risk evaluator → portfolio analyst',
      'Produces an execution handoff package with calldata, approve order, and sequencing',
    ],
  },
  'mantle-smart-contract-developer': {
    whenToUse: [
      'Designing a contract architecture for Mantle deployment',
      'Choosing OpenZeppelin patterns, access control, or upgradeability model',
      'Defining constructor params, dependencies, and external integration points',
      'Preparing a pre-deployment checklist',
    ],
    whatItDoes: [
      'Does not write Solidity — routes to OpenZeppelin MCP for code',
      'Asks for clarification if requirements are incomplete (fail-closed)',
      'Outputs a Mantle Contract Development Brief with all key decisions',
    ],
  },
  'mantle-smart-contract-deployer': {
    whenToUse: [
      'Ready to deploy a compiled contract to Mantle mainnet or Sepolia',
      'Estimating gas and deployment cost',
      'Verifying source code on the Mantle explorer after deployment',
      'Managing deployment receipts and artifacts',
    ],
    whatItDoes: [
      'Always confirms chain ID first: mainnet 5000, Sepolia 5003',
      'Read-only agent — produces a handoff package for an external signer',
      'Does not write Solidity — redirects to mantle-smart-contract-developer',
      'Restarts pre-deploy checks if the bytecode hash changes',
    ],
  },
  // Plugin
  'mantle-agent-scaffold': {
    whenToUse: [
      'Starting a new Mantle agent project from scratch',
      'Need a full project scaffold with MCP server + skills pre-wired',
      'Want CLI commands, build tooling, and deployment config ready to go',
    ],
    whatItDoes: [
      'Provides a complete Claude Code plugin scaffold for Mantle agents',
      'Includes MCP server setup, skill integration, and build pipeline',
      'Official Mantle plugin — maintained by the Mantle team',
    ],
  },
  // MCP
  'mantle-mcp': {
    whenToUse: [
      'Claude needs live access to Mantle on-chain data at runtime',
      'Reading wallet balances, token info, or allowances during a task',
      'Simulating transactions or querying subgraphs from within Claude',
      'Resolving and verifying contract addresses on the fly',
    ],
    whatItDoes: [
      'Exposes Mantle blockchain tools to Claude via Model Context Protocol',
      'Supports: getBalance, getTokenBalances, getAllowances, querySubgraph, simulateTx',
      'Read-only (v0.2) — no signing or broadcasting',
      'Runs as a stdio MCP server alongside your Claude agent',
    ],
  },
};
