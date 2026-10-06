import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const RETURN_KEY = 'skeeks_return_to' // survives the Google redirect

const input =
  'w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-fg outline-none placeholder:text-muted focus:border-white/40'

export default function Account() {
  const { user, loading, signOut } = useAuth()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  // Remember the page to return to (the portrait button passes it in router state)
  useEffect(() => {
    if (loading) return
    if (state?.from) sessionStorage.setItem(RETURN_KEY, state.from)
    else if (!user && !sessionStorage.getItem(RETURN_KEY)) sessionStorage.setItem(RETURN_KEY, '/')
  }, [loading, state]) // eslint-disable-line react-hooks/exhaustive-deps

  // Signed in (email or Google): go back to the previous page
  useEffect(() => {
    if (!user) return
    const back = sessionStorage.getItem(RETURN_KEY)
    if (back) {
      sessionStorage.removeItem(RETURN_KEY)
      navigate(back, { replace: true })
    }
  }, [user, navigate])

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    setNotice('')
    const { data, error } =
      mode === 'signup'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) return setError(error.message)
    if (mode === 'signup' && !data.session) setNotice('Check your email to confirm your account, then log in.')
  }

  const google = async () => {
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/account` },
    })
    if (error) setError(error.message)
  }

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <div className="glass-panel rounded-3xl p-8">
        <p className="eyebrow">Account</p>

        {!supabase ? (
          <p className="mt-4 text-sm text-muted">
            Sign-in isn't set up yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file and restart the dev server.
          </p>
        ) : loading ? (
          <p className="mt-4 text-sm text-muted">Loading…</p>
        ) : user ? (
          <>
            <h1 className="mt-2 text-3xl">You're signed in</h1>
            <p className="mt-4 text-sm text-muted">Signed in as</p>
            <p className="mt-1 truncate">{user.email}</p>
            <button type="button" onClick={signOut} className="btn mt-8 w-full">Log out</button>
          </>
        ) : (
          <>
            <h1 className="mt-2 text-3xl">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>

            <div className="glass mt-6 flex gap-1 rounded-full p-1">
              {[['login', 'Log in'], ['signup', 'Sign up']].map(([m, label]) => (
                <button key={m} type="button" onClick={() => { setMode(m); setError(''); setNotice('') }}
                  className={`pill flex-1 justify-center ${mode === m ? 'pill-active' : ''}`}>
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="mt-6 space-y-3">
              <input type="email" required autoComplete="email" placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)} className={input} />
              <input type="password" required minLength={6} placeholder="Password" value={password}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                onChange={(e) => setPassword(e.target.value)} className={input} />
              <button type="submit" disabled={busy} className="btn w-full disabled:opacity-50">
                {busy ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4 text-xs text-muted">
              <span className="h-px flex-1 bg-white/15" />or<span className="h-px flex-1 bg-white/15" />
            </div>

            <button type="button" onClick={google} className="btn-outline w-full">Continue with Google</button>

            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
            {notice && <p className="mt-4 text-sm text-muted">{notice}</p>}
          </>
        )}
      </div>
    </div>
  )
}