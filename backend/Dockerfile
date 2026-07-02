FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev
COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup && chown -R appuser:appgroup /app

USER appuser

ENV NODE_ENV=production
ENV PORT=7860
EXPOSE 7860

CMD ["node", "server.js"]