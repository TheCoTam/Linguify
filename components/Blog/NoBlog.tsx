import Link from 'next/link';

function NoBlog() {
  return (
    <div>
      No post yet. Be the first person to{' '}
      <Link
        href="/blog/create"
        className="inline-flex underline text-orange-600"
      >
        write something
      </Link>
    </div>
  );
}

export default NoBlog;
