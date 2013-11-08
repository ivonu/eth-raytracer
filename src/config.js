RayConfig = {
    width: 800,
    height: 600,

    shadows: true,
    specular_highlights: true,
    diffuse_illumination: true,
    ambient_illumination: true,
    global_ambient_illumination: true,

    reflection_depth: 4,
    reflection: true,
    refraction: true,

    samples_per_pixel: ModuleId.B2 ? 16 : 1,
    samples_per_axis: ModuleId.B2 ? 4 : 1,
    anti_aliasing_method: Ray.AntiAliasing.GRID,

    normalmap: true,
    texture: true,

    octree: true,
    octree_max_depth: 100,

    soft_shadow_samples: 50,
    soft_shadow_grid_size_axis: 8,
    soft_shadow_method: AreaLight.Method.JITTER,

    intersection_delta: 0.00001
};


