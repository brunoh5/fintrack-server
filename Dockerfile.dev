FROM node:lts-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/app

COPY package.json pnpm-lock.yaml /usr/app

COPY . .
RUN pnpm install --frozen-lockfile
# RUN pnpm prisma generate
# RUN pnpm prisma migrate deploy

EXPOSE 3333
