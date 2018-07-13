RULES
-----

Please have a look at the bullets below before starting your hunt!

* Issues that have already been submitted by another user or are already known to the Ethereum team are not eligible for bounty rewards.
* Public disclosure of a vulnerability makes it ineligible for a bounty.
* You can start or fork a private chain for bug hunting. Please respect the Ethereum main and test networks and refrain from attacking them.
* Ethereum’s core development team, employees and all other people paid by the Ethereum project, directly or indirectly, are not eligible for rewards.
* Anyone who works with the codebase as a professional Ethereum developer is not eligible for rewards.
* Ethereum websites or Ethereum Foundation infrastructure in general, are NOT part of the bounty program.
* Ethereum bounty program considers a number of variables in determining rewards. Determinations of eligibility, score and all terms related to an award are at the sole and final discretion of the Ethereum Foundation bug bounty panel.

Reward sizes are guided by the rules below, but are in the end, determined at the sole discretion of the Ethereum Foundation bug bounty panel.

* *Critical*: up to 25 000 points
* *High*: up to 15 000 points
* *Medium*: up to 10 000 points
* *Low*: up to 2 000 points
* *Note*: up to 500 points

In addition to *Severity*, other variables are also considered when the Ethereum Foundation bug bounty panel decides the score, including (but not limited to):

* *Quality of description.* Higher rewards are paid for clear, well-written submissions.
* *Quality of reproducibility.* Please include test code, scripts and detailed instructions. The easier it is for us to reproduce and verify the vulnerability, the higher the reward. * Please see the wiki and repos to learn more about our test suite in the official documentation.
* *Quality of fix, if included.* Higher rewards are paid for submissions with clear description of how to fix the issue.

OPEN BOUNTIES
-------------

### Protocol security
The idea for Ethereum was initially published in the [White Paper](https://www.truechain.pro/Truechain_en.pdf). This concept has been realized in a few protocols and algorithms up for scrutiny:
* The blockchain consensus protocol, state engine and virtual machine as well as encodings and Merkle Patricia trees as specified in the [Yellow Paper](https://www.truechain.pro/paper.pdf)
Help identify flaws such as ones found in the yellow paper, relating to:
* Conceptual security issues in the formal specification of the Ethereum protocol.
* Misaligned / unintended economic incentives and game theoretic flaws.
* Security weaknesses / attacks on the PoW algorithm.
* A concrete example could be a contract that consumes very little gas but leads to a lot of computational effort effectively opening the door for DoS attacks.


### Implementation security
#### Client protocol implementation security
* Validations of blocks, transactions and messages
* Ethereum Virtual Machine code execution
* Transaction execution
* Contract creation
* Message calls
* Calculation and enforcement of gas and fees

#### Network security
* 51% and other X% attacks.
* Finney attacks.
* Sybil attacks.
* Replay attacks.
* Transaction / messages malleability.
* (global) DoS.

#### Node security
* DoS / resource abuse
* Account / wallet address gathering/probing
* Broadcast / withhold attacks

#### Client application security
* Data type overflow / wrap around, e.g. integer overflow.
* Panics or not properly handled errors.
* Concurrency, e.g. synchronization, state, races.
* Issues related to external libraries used.
 
#### Cryptographic primitives security
* Incorrect implementation / usage / configuration of:
* Elliptic curve (secp256k1, ECDSA).
* Hash algorithms (Keccak-256).
* Merkle Patricia trees.
