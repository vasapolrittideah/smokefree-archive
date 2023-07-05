FROM alpine:latest

WORKDIR /workspace

COPY .env dist/apps/api ./

EXPOSE 8082

CMD [ "./api" ]
