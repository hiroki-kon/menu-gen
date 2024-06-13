FROM amazoncorretto:21 as jvm
WORKDIR /app
COPY ./ ./
RUN ./gradlew build -x test
ENV DATASOURCE
ENV POSTGRES_USER
ENV POSTGRES_PASSWORD
ENV CLAUDE_API_KEY

ENTRYPOINT ["java", "-jar", "build/libs/menu-generator-0.0.1-SNAPSHOT.jar"]