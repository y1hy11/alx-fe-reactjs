export default {
  presets: [
    ['@babel/preset-env', { 
      targets: { node: 'current' },
      modules: false
    }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { 
          targets: { node: 'current' },
          modules: 'commonjs'
        }],
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }
  }
};