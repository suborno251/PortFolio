export default function Marquee() {
  const content = (
    <span>
      LARAVEL <i>✦</i> NODE.JS <i>✦</i> REACT <i>✦</i> NEXT.JS <i>✦</i> TYPESCRIPT <i>✦</i>{' '}
      FASTAPI <i>✦</i> POSTGRESQL <i>✦</i> MYSQL <i>✦</i> MONGODB <i>✦</i> REDIS <i>✦</i>{' '}
      DOCKER <i>✦</i> AWS S3 <i>✦</i> ANGULAR <i>✦</i> EXPRESS <i>✦</i> GOOGLE GEMINI <i>✦</i>{' '}
    </span>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {content}
        {content}
      </div>
    </div>
  );
}
