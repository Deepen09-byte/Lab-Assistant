import React, { useState } from 'react'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Register form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-[#020c0c] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-sm">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="register-username" className="mb-1 block text-sm font-medium text-slate-200">
              Username
            </label>
            <input
              id="register-username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="john_doe"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-[#016a71] focus:outline-none focus:ring-2 focus:ring-[#016a71]/50"
              required
            />
          </div>

          <div>
            <label htmlFor="register-email" className="mb-1 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="register-email"
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
            <label htmlFor="register-password" className="mb-1 block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              id="register-password"
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
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register