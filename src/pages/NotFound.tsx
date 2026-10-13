import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="rounded-lg bg-surface p-8 text-center shadow-sm">
      <h2 className="text-2xl font-bold text-heading">Page Not Found</h2>
      <p className="mt-2 text-body">
        The page you requested does not exist.
      </p>
      <Link
        to="/"
        className="mt-5 inline-block rounded-md bg-primary px-4 py-2 text-on-primary hover:bg-primary-hover"
      >
        Back to Dashboard
      </Link>
    </section>
  )
}

export default NotFound
