export interface ParticlesNumberConfig {
  value?: number;
  density?: {
    enable?: boolean;
    value_area?: number;
  };
}

export interface ParticlesColorConfig {
  value?: string | string[] | { r: number; g: number; b: number } | { h: number; s: number; l: number };
}

export interface ParticlesShapeConfig {
  type?: string | string[];
  stroke?: {
    width?: number;
    color?: string;
  };
  polygon?: {
    nb_sides?: number;
  };
  image?: {
    src?: string;
    width?: number;
    height?: number;
  };
}

export interface ParticlesOpacityConfig {
  value?: number;
  random?: boolean;
  anim?: {
    enable?: boolean;
    speed?: number;
    opacity_min?: number;
    sync?: boolean;
  };
}

export interface ParticlesSizeConfig {
  value?: number;
  random?: boolean;
  anim?: {
    enable?: boolean;
    speed?: number;
    size_min?: number;
    sync?: boolean;
  };
}

export interface ParticlesLineLinkedConfig {
  enable?: boolean;
  distance?: number;
  color?: string;
  opacity?: number;
  width?: number;
}

export interface ParticlesMoveConfig {
  enable?: boolean;
  speed?: number;
  direction?: 'none' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left';
  random?: boolean;
  straight?: boolean;
  out_mode?: 'out' | 'bounce';
  bounce?: boolean;
  attract?: {
    enable?: boolean;
    rotateX?: number;
    rotateY?: number;
  };
}

export interface ParticlesConfig {
  particles?: {
    number?: ParticlesNumberConfig;
    color?: ParticlesColorConfig;
    shape?: ParticlesShapeConfig;
    opacity?: ParticlesOpacityConfig;
    size?: ParticlesSizeConfig;
    line_linked?: ParticlesLineLinkedConfig;
    move?: ParticlesMoveConfig;
    array?: unknown[];
  };
  interactivity?: {
    detect_on?: 'canvas' | 'window';
    events?: {
      onhover?: {
        enable?: boolean;
        mode?: string | string[];
      };
      onclick?: {
        enable?: boolean;
        mode?: string | string[];
      };
      resize?: boolean;
    };
    modes?: {
      grab?: {
        distance?: number;
        line_linked?: { opacity?: number };
      };
      bubble?: {
        distance?: number;
        size?: number;
        duration?: number;
        opacity?: number;
      };
      repulse?: {
        distance?: number;
        duration?: number;
      };
      push?: {
        particles_nb?: number;
      };
      remove?: {
        particles_nb?: number;
      };
    };
  };
  retina_detect?: boolean;
  [key: string]: unknown;
}

export interface ParticlesJS {
  (tag_id: string | ParticlesConfig, params?: ParticlesConfig): void;
  load(
    tag_id: string,
    path_config_json: string,
    callback?: () => void
  ): void;
}

export declare const pJSDom: unknown[];
export declare const particlesJS: ParticlesJS;
export default particlesJS;

declare global {
  interface Window {
    particlesJS: ParticlesJS;
    pJSDom: unknown[];
  }
}
