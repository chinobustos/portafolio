'use client'

import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import type { Application } from '@splinetool/runtime'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

/**
 * Escena 3D de Spline con carga y render diferidos.
 *
 * El runtime de Spline pesa ~2 MB y, una vez montado, renderiza en WebGL a 60fps
 * de forma continua aunque la sección esté muy lejos del viewport. Eso competía
 * con el scroll durante toda la página.
 *
 * Ahora:
 *  - No se descarga ni se monta hasta que la sección se acerca al viewport.
 *  - Al salir de pantalla se llama a `app.stop()` (pausa render, controles y
 *    eventos) y a `app.play()` al volver a entrar, sin desmontar ni volver a
 *    descargar la escena.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          appRef.current?.play()
        } else {
          appRef.current?.stop()
        }
      },
      // Margen generoso: empieza a cargar antes de que se vea y sigue activa
      // mientras esté cerca, evitando arranques y frenadas continuos.
      { rootMargin: '400px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      appRef.current?.stop()
      appRef.current = null
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full">
      {shouldRender ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <span className="loader">Cargando 3D...</span>
            </div>
          }
        >
          <Spline
            scene={scene}
            className={className}
            onLoad={(app) => {
              appRef.current = app
            }}
          />
        </Suspense>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader">Cargando 3D...</span>
        </div>
      )}
    </div>
  )
}
