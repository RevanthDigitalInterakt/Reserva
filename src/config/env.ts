const dev = {
    SENTRY_KEY: 'https://d745bc385713420fb560e7c1602a14b1@o290903.ingest.sentry.io/5716450'
}

const production: typeof dev = {...dev, ...{
    
}}; 

export const env = dev;