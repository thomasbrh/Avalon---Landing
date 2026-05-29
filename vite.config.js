import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(
{
    root: 'src',
    publicDir: '../public',
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build: 
    {
        outDir: '../dist',
        rollupOptions: 
        {
            input:
            {
                main:    resolve(__dirname, 'src/index.html'),
                credits: resolve(__dirname, 'src/credits.html'),
                ia:      resolve(__dirname, 'src/ia.html'),
            },
        },
    },
})
