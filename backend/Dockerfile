FROM amazoncorretto:21 as jvm
WORKDIR /app
COPY ./ ./
RUN ./gradlew build -x test

ENTRYPOINT ["java", "-jar", "build/libs/menu-generator-0.0.1-SNAPSHOT.jar"]