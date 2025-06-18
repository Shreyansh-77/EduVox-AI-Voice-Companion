import Image from "next/image"
import Link from "next/link"

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start learning your way</div>
      <h2 className="test-3xl font-bold">
        Build and Personalize Leaning Companion
      </h2>
      <p>Pick a name, subject, vioce, & personality and start learning through voice conversation that feel natural and fun</p>
      <Image src="/images/cta.svg" alt="CTA" width={362} height={232}/>
      <p>Take a leap and aim higher</p>
      <button className="btn-primary">
        <Image
          src="/icons/plus.svg"
          alt="+"
          width={12}
          height={12}
        />
        <Link href="/companions/new">
          <p>Build a New Companion</p>
        </Link>
      </button>
    </section>
  )
}

export default CTA