import type { Register } from 'claude-code'

const POLICY = `# Delegación por modelo
- Buscar, leer archivos, listar, preguntas simples: subagente tri-model:scout (Haiku).
- Tarea no trivial (varios archivos, diseño, ambigua): primero tri-model:planner (Opus), luego pasa su plan a tri-model:executor (Sonnet).
- Cambios pequeños y obvios: hazlos tú, sin delegar.
- Si una skill o plugin (p. ej. superpowers) pide un subagente para explorar/buscar, usa tri-model:scout; para planificar, tri-model:planner; para implementar, tri-model:executor.`

export const register: Register = (on) => {
  on('prompt.compose', async (_$, e, next) => {
    const r = await next(e)
    return { sections: [...r.sections, { id: 'tri-model:policy', text: POLICY, scope: 'session' }] }
  })
}
