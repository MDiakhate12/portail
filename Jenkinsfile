
node('faas-cloud-frontend') {
  agent 
  stages {
    stage('echo diaf') {
      steps {
        sh "echo 'diaf copain' > diaf"
        sh "cat diaf"
      }
    }
  }
}
