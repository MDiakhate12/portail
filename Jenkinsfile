
node('faas-cloud-frontend') {
  agent any
  stages {
    stage('echo diaf') {
      steps {
        sh 'echo "diaf copain" > diaf.txt'
        sh "cat diaf"
      }
    }
  }
}
