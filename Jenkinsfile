pipeline{
    agent any
    environment{
        GCP_CREDENTIALS = "gcp-credentails"
        PROJECT_ID = "kubernetes-434909"
        REGION = "us-central1"
        IMAGE_NAME = "${REGION}-docker.pkg.dev/${PROJECT_ID}/blue-green-app/bank-ui"
    }
    stages{
        stage("Authenticate with GCP") {
            steps {
                script {
                    withGCP(credentialsId: GCP_CREDENTIALS) {
                        sh """
                            gcloud config get-value account
                            gcloud auth configure-docker us-central1-docker.pkg.dev --quiet
                        """
                    }
                }
            }
        }
        stage("Build Docker Image") {
            steps {
                script {
                    echo "Image name: ${IMAGE_NAME}"
                    dockerImage = docker.build("${IMAGE_NAME}:dev-${BUILD_NUMBER}", "./")
                }
            }
        }
        stage("Push images") {
            steps {
                script {
                    sh """
                       docker push ${IMAGE_NAME}:dev-${BUILD_NUMBER}
                       docker tag ${IMAGE_NAME}:dev-${BUILD_NUMBER} ${IMAGE_NAME}:latest
                       docker push ${IMAGE_NAME}:latest
                    """
                }
            }
        }
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}
