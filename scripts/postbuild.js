import rss from './rss.mjs'

async function postbuild() {
  try {
    await rss()
    console.log('✅ RSS generated successfully')
  } catch (err) {
    console.warn('⚠️ RSS generation skipped:', err.message)
  }
}

postbuild()
