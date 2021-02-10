node('faas-cloud-frontend') {
    stage('echo diaf') {
        dir('/home/dmouhammad/portail') {
            sh "git pull origin master"
            sh "npm run build"
            sh "sudo cp -r ./build/* /var/www/faas-cloud-frontend.mouhammad.ml/html/"
        }
    }
}
