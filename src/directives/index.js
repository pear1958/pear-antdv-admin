import { setupAuthDirective } from './modules/auth'
import { setupDragDirective } from './modules/drag'

export function setupDirectives(app) {
  setupAuthDirective(app)
  setupDragDirective(app)
}
