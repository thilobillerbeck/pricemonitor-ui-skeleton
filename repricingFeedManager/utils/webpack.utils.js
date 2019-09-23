module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  rules: {
    html: {
      test: /\.html$/,
      exclude: [/index\.html/],
      use: [
        {
          loader: 'ngtemplate-loader',
          options: {
            angular: true
          },
        },
        {
          loader: 'html-loader'
        },
      ],
    },
    images: {
      // Inline assets
      test: /\.(ttf|eot|svg|woff2?|jpe?g|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader'
    },
    less: {
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'less-loader'
        },
      ]
    },
    css: {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    typescript: {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader'
        },
        {
          loader: 'auto-ngtemplate-loader'
        }
      ],
      exclude: /node_modules/
    }
  }
};
