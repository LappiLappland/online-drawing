FROM denoland/deno:alpine-1.44.4

WORKDIR /app

COPY deno.json* deno.lock* ./

RUN deno cache main.ts

COPY . .

RUN mkdir -p public

EXPOSE 3000

CMD ["deno", "task", "start"]