import React from "react";
import { SplineScene } from "./ui/splite";
import { ContainerScroll } from "./ui/container-scroll-animation";

const BrandStatement = () => {
  return (
    <section id="brand-statement" className="bg-black w-full overflow-hidden">
      <div className="flex flex-col overflow-hidden pb-[100px] pt-[50px] md:pt-[100px]">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1] mb-8">
                Creo plataformas web <br />
                <span className="text-white/90">
                  inmersivas y ultrafuncionales
                </span>
              </h2>
              <p className="mt-8 mb-8 text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
                que elevan la percepción de marca, incrementan la conversión y las
                diferencian de la competencia.
              </p>
            </>
          }
        >
          <div className="h-full w-full relative">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
};

export default BrandStatement;