import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useQuiz } from '../../hooks/useQuiz'

export function Profile() {
  const { currentUser } = useAuth()
  const { answers, quizzes } = useQuiz()
  const [isEditing, setIsEditing] = useState(false)
  const [selectedBestCategory, setSelectedBestCategory] = useState(() => {
    // Load custom selected best category from localStorage if it exists
    try {
      const stored = localStorage.getItem(`qm_best_category_${currentUser?.email}`)
      return stored || null
    } catch {
      return null
    }
  })
  const [profileImage, setProfileImage] = useState(() => {
    // Load image from localStorage if it exists
    try {
      const stored = localStorage.getItem(`qm_profile_image_${currentUser?.email}`)
      return stored || null
    } catch {
      return null
    }
  })
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    dob: currentUser?.dob || '',
    phone: currentUser?.phone || '',
    country: currentUser?.country || '',
    city: currentUser?.city || '',
    address: currentUser?.address || '',
    zipCode: currentUser?.zipCode || '',
  })

  // Calculate stats based on quiz performance
  const calculateStats = () => {
    if (!answers || Object.keys(answers).length === 0) {
      return {
        joinDate: 'N/A',
        bestCategory: 'N/A',
        totalAttempts: 0,
        totalScore: 0,
        accuracy: '0%',
      }
    }

    // Get first play date from localStorage (when user first played a quiz)
    let joinDate = 'N/A'
    try {
      const firstPlayDate = localStorage.getItem(`qm_first_play_date_${currentUser?.email}`)
      if (firstPlayDate) {
        joinDate = new Date(firstPlayDate).toLocaleDateString()
      }
    } catch {
      joinDate = 'N/A'
    }

    // Count total attempts (number of quizzes completed)
    const totalAttempts = Object.keys(answers).length

    // Calculate total score
    let totalScore = 0
    let correctAnswers = 0
    let totalQuestions = 0

    Object.keys(answers).forEach(quizId => {
      const quiz = quizzes.find(q => q.id === quizId)
      if (quiz) {
        const quizAnswers = answers[quizId]
        quiz.questions.forEach((question, index) => {
          totalQuestions++
          if (quizAnswers[index] === question.correctAnswer) {
            correctAnswers++
            totalScore += 10 // 10 points per correct answer
          }
        })
      }
    })

    // Calculate accuracy percentage
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0

    // Use custom selected best category if it exists, otherwise calculate automatically
    let bestCategory = selectedBestCategory || 'N/A'
    
    if (!selectedBestCategory) {
      // Find best performing category (quiz with highest score for that quiz)
      let highestScore = 0
      Object.keys(answers).forEach(quizId => {
        const quiz = quizzes.find(q => q.id === quizId)
        if (quiz) {
          const quizAnswers = answers[quizId]
          let quizScore = 0
          quiz.questions.forEach((question, index) => {
            if (quizAnswers[index] === question.correctAnswer) {
              quizScore += 10
            }
          })
          if (quizScore > highestScore) {
            highestScore = quizScore
            bestCategory = quiz.title
          }
        }
      })
    }

    return {
      joinDate,
      bestCategory,
      totalAttempts,
      totalScore,
      accuracy: `${accuracy}%`,
    }
  }

  const profileStats = calculateStats()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        return
      }

      // Convert to base64
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    if (confirm('Are you sure you want to remove your profile image?')) {
      setProfileImage(null)
    }
  }

  const handleSave = () => {
    // Save profile data
    console.log('Saving profile:', formData)
    
    // Save or remove image from localStorage
    if (currentUser?.email) {
      try {
        if (profileImage) {
          localStorage.setItem(`qm_profile_image_${currentUser.email}`, profileImage)
        } else {
          localStorage.removeItem(`qm_profile_image_${currentUser.email}`)
        }
        
        // Save selected best category
        if (selectedBestCategory) {
          localStorage.setItem(`qm_best_category_${currentUser.email}`, selectedBestCategory)
        }
      } catch (error) {
        console.error('Failed to save data:', error)
      }
    }
    
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      dob: currentUser?.dob || '',
      phone: currentUser?.phone || '',
      country: currentUser?.country || '',
      city: currentUser?.city || '',
      address: currentUser?.address || '',
      zipCode: currentUser?.zipCode || '',
    })
    // Reset image if not saved
    setProfileImage(() => {
      try {
        const stored = localStorage.getItem(`qm_profile_image_${currentUser?.email}`)
        return stored || null
      } catch {
        return null
      }
    })
    setIsEditing(false)
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() || '?'
  }

  if (!currentUser) {
    return (
      <section className="grid gap-3 rounded-2xl border border-app-border bg-app-card p-5 shadow-premium">
        <p className="text-app-muted">Please log in to view your profile.</p>
      </section>
    )
  }

  return (
    <div className="grid gap-6">
      {/* Profile Header Card */}
      <section className="rounded-2xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-6 shadow-premium">
        <div className="flex items-start gap-6">
          {/* Avatar with Upload */}
          <div className="relative flex flex-shrink-0 flex-col items-center gap-2">
            <div className="relative h-24 w-24 overflow-hidden rounded-full shadow-lg">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 text-3xl font-bold text-white">
                  {getInitials(formData.firstName, formData.lastName)}
                </div>
              )}
              
              {/* Upload Overlay on Hover (when editing) */}
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <span className="text-center text-sm font-semibold text-white">
                      {profileImage ? 'Change' : 'Upload'}
                    </span>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {/* Upload/Remove Buttons - Shown when editing */}
            {isEditing && (
              <div>
                {!profileImage ? (
                  <label htmlFor="image-upload" className="cursor-pointer rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-700">
                    Add Image
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleRemoveImage}
                      className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
                    >
                      Remove Image
                    </button>
                    <label htmlFor="image-upload" className="cursor-pointer rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-700">
                      Add new image
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Basic Profile Info */}
          <div className="flex-1 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-app-muted">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="mt-1 block w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-app-text placeholder-app-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                ) : formData.firstName ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    readOnly
                    className="mt-1 block w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-app-text"
                  />
                ) : (
                  <p className="mt-1 text-app-muted">Not added</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-app-muted">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    className="mt-1 block w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-app-text placeholder-app-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                ) : formData.lastName ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    readOnly
                    className="mt-1 block w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-app-text"
                  />
                ) : (
                  <p className="mt-1 text-app-muted">Not added</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-app-muted">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="mt-1 block w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-app-text placeholder-app-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                ) : formData.email ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="mt-1 block w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-app-text"
                  />
                ) : (
                  <p className="mt-1 text-app-muted">Not added</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-app-card"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="rounded-lg border border-app-border bg-app-surface px-4 py-2 text-sm font-medium text-app-text hover:bg-app-border focus:outline-none focus:ring-2 focus:ring-app-border focus:ring-offset-2 focus:ring-offset-app-card"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-app-card"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information Section */}
      {isEditing && (
        <section className="rounded-2xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-6 shadow-premium">
          <h3 className="mb-4 text-lg font-semibold text-app-text">Personal Information</h3>
          
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-app-muted">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-app-text placeholder-app-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-app-muted">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="mt-1 block w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-app-text placeholder-app-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-app-muted">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="United States"
                  className="mt-1 block w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-app-text placeholder-app-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-app-muted">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  className="mt-1 block w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-app-text placeholder-app-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-app-muted">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                className="mt-1 block w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-app-text placeholder-app-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-app-muted">ZIP / Postal Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="10001"
                className="mt-1 block w-full rounded-lg border border-app-border bg-app-surface px-3 py-2 text-app-text placeholder-app-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>
        </section>
      )}

      {/* Display Mode - Personal Info Section */}
      {!isEditing && (
        <section className="rounded-2xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-6 shadow-premium">
          <h3 className="mb-4 text-lg font-semibold text-app-text">Personal Information</h3>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-app-border/50 bg-app-surface/50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-app-muted">Date of Birth</p>
              <p className="mt-2 text-app-text">{formData.dob || 'Not provided'}</p>
            </div>

            <div className="rounded-lg border border-app-border/50 bg-app-surface/50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-app-muted">Phone Number</p>
              <p className="mt-2 text-app-text">{formData.phone || 'Not provided'}</p>
            </div>

            <div className="rounded-lg border border-app-border/50 bg-app-surface/50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-app-muted">Country</p>
              <p className="mt-2 text-app-text">{formData.country || 'Not provided'}</p>
            </div>

            <div className="rounded-lg border border-app-border/50 bg-app-surface/50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-app-muted">City</p>
              <p className="mt-2 text-app-text">{formData.city || 'Not provided'}</p>
            </div>

            <div className="sm:col-span-2 rounded-lg border border-app-border/50 bg-app-surface/50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-app-muted">Address</p>
              <p className="mt-2 text-app-text">{formData.address || 'Not provided'}</p>
            </div>

            <div className="rounded-lg border border-app-border/50 bg-app-surface/50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-app-muted">ZIP / Postal Code</p>
              <p className="mt-2 text-app-text">{formData.zipCode || 'Not provided'}</p>
            </div>
          </div>
        </section>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-4 shadow-premium">
          <p className="text-sm text-app-muted">Join Date</p>
          <p className="text-lg font-semibold text-app-text">{profileStats.joinDate}</p>
        </div>

        <div className="rounded-xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-4 shadow-premium">
          <p className="text-sm text-app-muted">Best Category</p>
          <p className={`text-lg font-semibold ${profileStats.bestCategory === 'N/A' ? 'text-app-muted' : 'text-primary-400'}`}>
            {profileStats.bestCategory}
          </p>
        </div>

        <div className="rounded-xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-4 shadow-premium">
          <p className="text-sm text-app-muted">Total Attempts</p>
          <p className="text-lg font-semibold text-app-text">{profileStats.totalAttempts}</p>
        </div>

        <div className="rounded-xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-4 shadow-premium">
          <p className="text-sm text-app-muted">Accuracy Rate</p>
          <p className="text-lg font-semibold text-primary-400">{profileStats.accuracy}</p>
        </div>

        <div className="rounded-xl border border-app-border bg-gradient-to-br from-app-card to-app-surface p-4 shadow-premium">
          <p className="text-sm text-app-muted">Total Score</p>
          <p className="text-lg font-semibold text-app-text">{profileStats.totalScore}</p>
        </div>
      </div>
    </div>
  )
}