/**
 * Global test setup for Vitest
 *
 * This file runs before every test file and configures:
 * 1. Global component stubs (router-link, router-view) to suppress Vue warnings
 * 2. URL.createObjectURL / revokeObjectURL mocks for jsdom compatibility
 * 3. Suppression of jsdom's "Not implemented: navigation" error
 */
import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// ─── 1. Globally stub router components ─────────────────────────────────────
// Vue components that use <router-link> or <router-view> will trigger
// "[Vue warn]: Failed to resolve component" in the test environment.
// Stubbing them globally avoids needing per-test stubs in every mount() call.
config.global.stubs = {
  'router-link': {
    template: '<a><slot /></a>',
  },
  'router-view': {
    template: '<div><slot /></div>',
  },
}

// ─── 2. Mock URL APIs for jsdom ──────────────────────────────────────────────
// jsdom does not implement URL.createObjectURL or URL.revokeObjectURL.
// Report views use these for PDF/CSV export, so they must be mocked.
if (typeof URL.createObjectURL === 'undefined') {
  URL.createObjectURL = vi.fn(() => 'blob:mock-url')
}
if (typeof URL.revokeObjectURL === 'undefined') {
  URL.revokeObjectURL = vi.fn()
}

// ─── 3. Suppress jsdom "Not implemented: navigation" errors ──────────────────
// When report views export files, they create an <a> element, set its href to a
// blob URL, and call link.click(). In jsdom this triggers "Not implemented:
// navigation to another Document" because jsdom can't navigate to blob URLs.
//
// We fix this by:
//   a) Mocking HTMLAnchorElement.prototype.click to be a no-op
//   b) Intercepting console.error for any residual jsdom messages

// (a) Prevent jsdom from attempting real navigation on anchor clicks
HTMLAnchorElement.prototype.click = vi.fn()

// (b) Filter out any remaining "Not implemented" messages from console.error
const originalConsoleError = console.error
console.error = (...args: any[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : String(args[0])
  if (msg.includes('Not implemented')) {
    return // Silence jsdom limitation warnings
  }
  originalConsoleError(...args)
}

