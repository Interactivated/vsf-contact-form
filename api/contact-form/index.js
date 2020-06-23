import { apiStatus } from '../../../lib/util'
import { Router } from 'express'
import { multiStoreConfig } from '../../../platform/magento2/util'
const Magento2Client = require('magento2-rest-client').Magento2Client

module.exports = ({ config, db }) => {
  let contactApi = Router()

  /**
   * POST Send Email from contact form.
   */
  contactApi.post('/send', (req, res) => {
    const data = {
      data: {
        email: req.body.email,
        name: req.body.name,
        telephone: req.body.telephone,
        comment: req.body.comment
      }
    }

    const client = Magento2Client(multiStoreConfig(config.magento2.api, req))
    client.addMethods('sendEmail', function(restClient) {
      let module = {}
      module.send = function() {
        return restClient.post('/contact', data, config.magento2.api.accessToken)
      }
      return module
    })
    client.sendEmail
      .send()
      .then(result => {
        apiStatus(res, result, 200)
      })
      .catch(err => {
        apiStatus(res, err, 500)
      })
  })
  return contactApi
}
