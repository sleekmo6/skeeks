import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthCtx = createContext({ user: null, loading: false, signOut: async () => {} })
export const useAuth = () => useContext(AuthCtx)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(Boolean(supabase))

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  // Clears the Supabase session; onAuthStateChange then sets the user to null
  const signOut = async () => {
    if (supabase) await supabase.auth.signOut()
  }

  return <AuthCtx.Provider value={{ user: session?.user ?? null, loading, signOut }}>{children}</AuthCtx.Provider>
}