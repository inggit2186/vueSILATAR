const MADRASAH_CONFIG = {
  min: {
    label: 'Madrasah Ibtidaiyah',
    shortLabel: 'MI',
    defaultStatus: 'Negeri',
    classLevels: [
      { name: 'Kelas I', prefix: '1' },
      { name: 'Kelas II', prefix: '2' },
      { name: 'Kelas III', prefix: '3' },
      { name: 'Kelas IV', prefix: '4' },
      { name: 'Kelas V', prefix: '5' },
      { name: 'Kelas VI', prefix: '6' }
    ]
  },
  mtsn: {
    label: 'Madrasah Tsanawiyah',
    shortLabel: 'MTs',
    defaultStatus: 'Negeri',
    classLevels: [
      { name: 'Kelas VII', prefix: '7' },
      { name: 'Kelas VIII', prefix: '8' },
      { name: 'Kelas IX', prefix: '9' }
    ]
  },
  man: {
    label: 'Madrasah Aliyah',
    shortLabel: 'MA',
    defaultStatus: 'Negeri',
    classLevels: [
      { name: 'Kelas X', prefix: '10' },
      { name: 'Kelas XI', prefix: '11' },
      { name: 'Kelas XII', prefix: '12' }
    ]
  }
}

export const MADRASAH_ALLOWED_CATEGORIES = Object.keys(MADRASAH_CONFIG)

export const getStoredUser = () => {
  const rawUser = localStorage.getItem('user')
  if (!rawUser) return null

  try {
    return JSON.parse(rawUser)
  } catch (error) {
    console.error('Gagal membaca user dari localStorage', error)
    return null
  }
}

export const getMadrasahCategory = (user = getStoredUser()) => {
  return String(user?.dept?.kategori || '').trim().toLowerCase()
}

export const getMadrasahConfig = (category = getMadrasahCategory()) => {
  return MADRASAH_CONFIG[category] || null
}

export const canAccessMadrasah = (user = getStoredUser()) => {
  return MADRASAH_ALLOWED_CATEGORIES.includes(getMadrasahCategory(user))
}

export const getMadrasahLabel = (user = getStoredUser()) => {
  const config = getMadrasahConfig(getMadrasahCategory(user))
  return config ? config.label : 'Madrasah'
}

export const getMadrasahShortLabel = (user = getStoredUser()) => {
  const config = getMadrasahConfig(getMadrasahCategory(user))
  return config ? config.shortLabel : 'Madrasah'
}

export const getMadrasahDefaultStatus = (user = getStoredUser()) => {
  const config = getMadrasahConfig(getMadrasahCategory(user))
  return config ? config.defaultStatus : ''
}

export const getMadrasahClassLevels = (user = getStoredUser()) => {
  const config = getMadrasahConfig(getMadrasahCategory(user))
  return config ? config.classLevels : []
}

export const getMadrasahClassLevelsForCategory = (category) => {
  const config = getMadrasahConfig(category)
  return config ? config.classLevels : []
}

export const getMadrasahClassLevelCount = (user = getStoredUser()) => {
  return getMadrasahClassLevels(user).length
}

export const getMadrasahClassLevelCountForCategory = (category) => {
  return getMadrasahClassLevelsForCategory(category).length
}
