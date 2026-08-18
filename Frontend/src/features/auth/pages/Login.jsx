import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  const navigate = useNavigate()

  const {handleLogin} = useAuth()

  isAllOf(!loading && user){
    return <Navigate to="/" replace />
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Login form submitted:', formData)

    await handleLogin(email, password)
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-[#020c0c] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-sm">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-[#016a71] focus:outline-none focus:ring-2 focus:ring-[#016a71]/50"
              required
            />
          </div>

          <div>
            <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-[#016a71] focus:outline-none focus:ring-2 focus:ring-[#016a71]/50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#016a71] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015a60] focus:outline-none focus:ring-2 focus:ring-[#016a71]/50"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-[#016a71] hover:text-[#015a60] transition">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login