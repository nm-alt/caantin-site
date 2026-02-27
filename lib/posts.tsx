export interface Post {
  slug: string
  title: string
  description: string
  date: string
  dateFormatted: string
  body: React.ReactNode
}

// ─── Post One ────────────────────────────────────────────────────────────────
const PostOneBody = () => (
  <>
    <p>
      Most digital lenders hit the same wall at roughly the same point in their
      growth. The loan book is performing. The product is working. The team is
      executing. And then delinquency starts climbing, the collections team
      cannot keep up, and the NPL ratio begins moving in the wrong direction.
    </p>
    <p>
      The instinct is to hire. Add agents. Build out the function. For a while
      it works. Then the book grows faster than the team can, and the problem
      returns — larger this time, and more expensive.
    </p>
    <p>
      This is not a staffing problem. It is a structural one. And until you see
      it clearly, you will keep solving the wrong thing.
    </p>

    <h2>The scale wall</h2>
    <p>
      A collections agent working a dialler can make 60 to 80 contact attempts
      per day. Of those, a third to a half will result in actual conversations.
      Of those conversations, a fraction will produce a payment arrangement.
      Follow-up, broken arrangements, dispute handling — this takes time. An
      experienced agent, working well, can actively manage 200 to 300 accounts
      at any given point.
    </p>
    <p>
      At 5,000 delinquent accounts, this is manageable. A team of 20 can touch
      the book. At 50,000 accounts — a number that arrives faster than most
      lenders expect — the same team is looking at 2,500 accounts each. That is
      not collections. That is triage.
    </p>
    <p>
      The math does not lie. At 80,000 accounts, a team of 25 agents working
      full capacity can make first contact with roughly 3,000 accounts per
      month. The other 77,000 accounts age. The early-stage debt becomes
      late-stage debt. The recoverable becomes unrecoverable.
    </p>

    <h2>The unit economics</h2>
    <p>
      The second problem lives in the P&amp;L, not the headcount plan.
    </p>
    <p>
      A single contact attempt — agent time, dialler cost, telephony,
      infrastructure overhead — costs somewhere between £6 and £14 depending on
      your market and setup. Reaching a delinquent borrower typically requires
      eight to twelve attempts. You are now looking at £80 to £150 before a
      single conversation has happened.
    </p>
    <p>
      For a £400 debt with a 30% recovery probability: expected recovery value
      is £120. Cost to recover: £100 or more. The margin barely exists, and
      that is before you account for the accounts that go to zero.
    </p>
    <p>
      For a £100 debt — common in salary advance, BNPL, and micro-loan
      portfolios — the unit economics are simply negative. Chasing it costs more
      than recovering it. These accounts are written off not because they are
      unrecoverable, but because the cost of recovery makes it irrational to
      try.
    </p>

    <blockquote>
      The lenders who will win are not the ones with bigger collections teams.
      They are the ones who figured out how to make the unit economics work at
      any scale.
    </blockquote>

    <h2>The tiering trap</h2>
    <p>
      Most lenders respond to the scale wall by tiering the book. Prioritise
      high-balance accounts. Focus agent time where the expected recovery value
      justifies the cost. Let the small balances sit or move them to a
      third-party agency.
    </p>
    <p>
      This is rational. It is also a trap.
    </p>
    <p>
      In digital lending — BNPL, embedded finance, salary advance, micro-loans
      — the vast majority of the book is under £500. Tiering away the small
      balances means ignoring most of what you are owed. The loss rate on your
      small-balance book becomes structural. It is priced in. Accepted.
    </p>
    <p>
      The better lenders know this is not a solution. It is a managed retreat.
    </p>

    <h2>What is actually working</h2>
    <p>
      The lenders seeing genuine improvement in recovery rates share a few
      things in common.
    </p>
    <p>
      First contact speed matters enormously. The probability of recovery drops
      significantly with each day that passes after first missed payment. The
      lenders recovering at the highest rates are making contact within 24 to 48
      hours — not 7 to 14 days. They are treating the first contact window as
      critical infrastructure, not a process to be managed.
    </p>
    <p>
      Negotiation beats notification. An automated SMS saying &ldquo;you have missed a
      payment&rdquo; produces a fraction of the outcomes of a conversation that
      understands the borrower&apos;s situation and offers a realistic path
      forward. The lenders recovering well are the ones whose collections
      function can actually negotiate — propose a partial payment, restructure
      an arrangement, acknowledge difficulty without losing the thread of
      repayment.
    </p>
    <p>
      Coverage at scale is the multiplier. A lender who can contact 100% of
      their delinquent book within 48 hours — every account, not just the
      high-balance ones — sees materially better outcomes than one who contacts
      50% of accounts within 14 days. The improvement compounds across the
      entire portfolio.
    </p>

    <h2>The implication</h2>
    <p>
      The structural insight is this: collections is a conversation problem, not
      a headcount problem. You do not need more agents. You need more
      conversations that can actually negotiate — at any scale, on any account,
      from the first day of delinquency.
    </p>
    <p>
      The technology to do this exists. The lenders who are deploying it are
      building a significant structural advantage. The ones who are not are
      managing the same problem, at growing cost, with diminishing returns.
    </p>
    <p>
      The wall is real. The way through it is not more people.
    </p>
  </>
)

// ─── Post Two ────────────────────────────────────────────────────────────────
const PostTwoBody = () => (
  <>
    <p>
      The two words that stop most conversations about AI in collections before
      they start: regulatory compliance. Fair enough. The history of debt
      collection is littered with enforcement actions, reputational damage, and
      companies that moved fast and then faced the consequences. Regulators are
      watching this space carefully, and digital lenders operate in environments
      where a single compliance failure can be existential.
    </p>
    <p>
      But there is a version of this conversation that gets the direction of
      causality exactly backwards. The assumption that AI-powered collections is
      inherently higher-risk than human-led collections is not supported by the
      evidence. In several important respects, it is the opposite.
    </p>

    <h2>What regulators actually care about</h2>
    <p>
      Across markets — FCA in the UK, CFPB in the United States, CBN in
      Nigeria, RBI in India, OJK in Indonesia — the regulatory frameworks for
      collections share a common logic, even where the specific rules differ.
    </p>
    <p>
      Fairness. Was the borrower treated with dignity? Were they given accurate
      information about their debt? Were customers in financial difficulty
      treated with appropriate consideration?
    </p>
    <p>
      Disclosure. Was the identity of the collecting party clearly stated? Was
      the nature of the debt accurately described?
    </p>
    <p>
      Timing and frequency. Were contact attempts made within permitted hours?
      Was the borrower contacted an unreasonable number of times?
    </p>
    <p>
      Audit and accountability. Can you demonstrate, to a regulator, exactly
      what happened in every interaction? Can you produce records? Can you prove
      that your process was compliant?
    </p>
    <p>
      These are the questions regulators ask. They are also, it turns out, the
      questions that AI-powered collections handles better than human-led
      operations.
    </p>

    <h2>The audit problem with human collections</h2>
    <p>
      Human agents are the weakest link in any collections compliance programme,
      not because they are dishonest, but because they are human. Training is
      inconsistent. Fatigue affects performance. Scripts are deviated from.
      Recording is incomplete. Memory is unreliable.
    </p>
    <p>
      When a regulator asks what was said in a specific call on a specific date,
      the answer — in most human-led operations — is: somewhere in a call
      recording, which you will need to find, assuming it was recorded, assuming
      the recording is complete, assuming the agent followed protocol that day.
    </p>
    <p>
      This is not hypothetical. Enforcement actions across every major regulated
      market have cited inadequate record-keeping, inconsistent agent behaviour,
      and the inability to demonstrate compliance at the individual interaction
      level.
    </p>

    <blockquote>
      An AI agent cannot have a bad day. It cannot forget to identify itself. It
      cannot call at 11pm. Every deviation from permitted behaviour is
      immediately flagged.
    </blockquote>

    <h2>How different markets are approaching it</h2>
    <p>
      The FCA&apos;s Consumer Credit sourcebook (CONC) applies to AI agents
      exactly as it applies to human agents. The medium is not the issue — the
      substance is. Fair treatment, accurate disclosure, appropriate handling of
      customers in financial difficulty. These are achievable, and in some
      respects more reliably achievable, through AI.
    </p>
    <p>
      The CFPB&apos;s approach under the Fair Debt Collection Practices Act
      focuses on timing, frequency, and content of communications. AI systems
      can enforce these constraints at the infrastructure level — no calls
      before 8am, no calls after 9pm, no contact after a cease-and-desist is
      registered. Rules that require training and enforcement with human agents
      become configuration parameters.
    </p>
    <p>
      Markets like Nigeria, India, and Indonesia are developing their frameworks
      in real time. The lenders operating there who are building clean audit
      trails now — structured interaction logs, timestamped records, searchable
      documentation — are building the compliance infrastructure that those
      markets will eventually require. They are ahead of the regulatory curve,
      not behind it.
    </p>

    <h2>The counter-intuitive truth</h2>
    <p>
      When every interaction is structured, every variable is tracked, and every
      response is logged, the question &ldquo;what happened in that conversation on the
      14th?&rdquo; has a definitive answer. Not a recording to search for, not an
      agent&apos;s recollection. A complete, timestamped, structured record.
    </p>
    <p>
      This is what genuine compliance infrastructure looks like. Not a policy
      document. Not a training programme. A system where compliance is
      architectural — built into how the thing works, not bolted on as an
      afterthought.
    </p>

    <h2>Compliance as competitive advantage</h2>
    <p>
      The lenders who are treating compliance as a constraint — a cost of doing
      business, a burden to manage — are building fragile operations. One
      enforcement action can redefine how their business is perceived and
      regulated.
    </p>
    <p>
      The lenders who are treating compliance as infrastructure are building
      something different. They can operate in any regulated market with
      confidence. They can demonstrate, at any point, exactly how they
      operate. They can move into new markets without rebuilding their compliance
      stack from scratch.
    </p>
    <p>
      Compliance is not the constraint on AI-powered collections. For the
      lenders who build it correctly, it is the moat.
    </p>
  </>
)

// ─── Post Three ──────────────────────────────────────────────────────────────
const PostThreeBody = () => (
  <>
    <p>
      There is a number every collections leader knows but rarely says out loud.
      The breakeven point. The debt value below which recovering the money costs
      more than the money is worth.
    </p>
    <p>
      For most digital lenders operating at scale, that number is somewhere
      between £100 and £300, depending on market, channel mix, and team
      efficiency. Below that line, human-led collections is economically
      irrational. The accounts sit. They age. They write off. And the loss rate
      becomes a structural feature of the business model, rather than a problem
      to be solved.
    </p>
    <p>
      Understanding why this happens — and why the unit economics change
      fundamentally with AI — is the key to understanding why collections is
      broken at scale, and how it gets fixed.
    </p>

    <h2>Building the model</h2>
    <p>
      Start with what it actually costs to collect a debt with a human agent.
    </p>
    <p>
      A single contact attempt — agent time (approximately 8 minutes including
      preparation and logging), dialler costs, telephony, and infrastructure
      overhead — runs to £6 to £14 in most markets. That is a fully-loaded cost
      per attempt, not just the call charge.
    </p>
    <p>
      Reaching a delinquent borrower typically requires 8 to 12 contact
      attempts. Some will answer on the first try. Many will not answer for
      days. By the time you have first contact, you have spent £80 to £150 in
      operational cost.
    </p>
    <p>
      Not every first contact produces a payment. Recovery rates from first
      contact vary by portfolio quality, vintage, and market — but 20% to 35%
      for early-stage delinquency is a reasonable range. On a £200 debt with a
      25% recovery rate, the expected recovery value is £50. The expected cost
      to reach that outcome is £100.
    </p>
    <p>
      The model is upside down.
    </p>

    <h2>Why digital lending books are particularly hard</h2>
    <p>
      Traditional consumer lending — personal loans, mortgages, auto finance —
      tends to produce high-balance delinquency. The economics of human
      collections were never great, but they worked well enough on large
      balances.
    </p>
    <p>
      Digital lending inverted the distribution. BNPL transactions average £80
      to £250. Salary advance products advance £200 to £600. Micro-loans in
      emerging markets are smaller still. The entire business model is built on
      high-volume, low-balance lending — which means the delinquent book is
      high-volume and low-balance by design.
    </p>
    <p>
      For these books, the human collections model does not just underperform.
      It fails structurally. The cost of attempting recovery on a £120 debt is
      greater than the maximum possible recovery value. There is no version of
      human-led collections that makes the economics work at this balance point.
    </p>

    <blockquote>
      The problem is not that digital lenders are bad at collections. The
      problem is that they inherited a model built for a different type of debt.
    </blockquote>

    <h2>What changes with AI</h2>
    <p>
      The fundamental shift is in the cost structure. Not optimised — inverted.
    </p>
    <p>
      When an AI agent initiates a collections conversation, the marginal cost
      per contact attempt approaches zero. The infrastructure exists. The
      conversation is initiated. No agent time is consumed. No telephony cost
      per call in the traditional sense. The tenth thousand conversation costs
      the same as the first.
    </p>
    <p>
      This changes the breakeven calculation entirely. On a £120 debt, if the
      cost of the contact attempt is effectively zero, then any recovery is
      positive. A 15% recovery rate on a portfolio of 10,000 small-balance
      accounts that would previously have been written off represents
      significant recovered value — at near-zero incremental cost.
    </p>
    <p>
      The portfolio that was not worth chasing becomes worth chasing. Every
      account becomes worth chasing.
    </p>

    <h2>The compounding effect</h2>
    <p>
      The change in unit economics does something else: it shifts where
      investment is worth making.
    </p>
    <p>
      In a human-led model, investment goes into contact volume. More agents,
      more calls, more attempts. The constraint is capacity.
    </p>
    <p>
      In an AI model, contact volume is not the constraint. The constraint —
      and the opportunity — is conversation quality. Every pound invested in
      improving how the AI negotiates, how it handles objections, how it
      proposes repayment arrangements, directly improves recovery rate across
      the entire portfolio. Not just the high-balance tier. Every account.
    </p>
    <p>
      At 80,000 accounts, the difference between a 15% and a 25% recovery rate
      is not marginal. It is the difference between a collections function that
      bleeds and one that performs.
    </p>

    <h2>The new economics</h2>
    <p>
      The lenders who understand this are not trying to make human collections
      more efficient. They have recognised that the model itself is broken for
      the type of lending they do — and they are building on a different
      economic foundation entirely.
    </p>
    <p>
      For them, the question is no longer whether they can afford to chase a
      debt. Every debt is worth chasing. The question is how to make every
      conversation as effective as possible.
    </p>
    <p>
      That is a very different problem. And it is a solvable one.
    </p>
  </>
)

// ─── Posts registry ──────────────────────────────────────────────────────────
export const posts: Post[] = [
  {
    slug: 'why-collections-breaks-at-scale',
    title:
      'Why collections breaks at scale for digital lenders — and what\'s actually working.',
    description:
      'The unit economics of human-led collections fail at high volume. Here\'s why, and what the lenders seeing results are doing differently.',
    date: '2026-02-12',
    dateFormatted: '12 February 2026',
    body: <PostOneBody />,
  },
  {
    slug: 'the-compliance-constraint',
    title:
      'The compliance constraint: how regulated markets are approaching AI-powered debt recovery.',
    description:
      'AI in collections is not inherently higher-risk than human-led collections. In several important respects, it is the opposite.',
    date: '2026-02-19',
    dateFormatted: '19 February 2026',
    body: <PostTwoBody />,
  },
  {
    slug: 'unit-economics-of-collections',
    title:
      'The unit economics of collections: why human-led recovery stops working at high volume.',
    description:
      'There is a debt value below which recovering the money costs more than the money is worth. Understanding that number — and what changes with AI — is everything.',
    date: '2026-02-26',
    dateFormatted: '26 February 2026',
    body: <PostThreeBody />,
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
