var express = require('express');
const Emp = require('./Models/emp')
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')
var app = express();
const mongoose = require('mongoose');//Routes
const User = require('./Models/user')
const AdminBroExpressjs = require('admin-bro-expressjs')

app.get('/', function (req, res) {
    res.send('Hello World!');
});

//Database
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.connection.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
})

//Admin Bro
const canModifyUsers = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin'

const canEditEmp = ({ currentAdmin, record }) => {
    return currentAdmin && (
      currentAdmin.role === 'admin'
      
    )
  }
AdminBro.registerAdapter(AdminBroMongoose)
const AdminBroOptions = {
    resources: 
    [
        {
            resource: Emp,
            options: {
              properties: {
                ownerId: { isVisible: { edit: false, show: true, list: true, filter: true } }
              },
              actions: {
                edit: { isAccessible: canEditEmp },
                delete: { isAccessible: canEditEmp },
                new: { isAccessible: canEditEmp },
              }
           }},
    {
      resource: User,  
      options: {
        properties: {
          encryptedPassword: { isVisible: false },
          password: {
            type: 'string',
            isVisible: {
              list: false, edit: true, filter: false, show: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if(request.payload.record.password) {
                request.payload.record = {
                  ...request.payload.record,
                  encryptedPassword: await bcrypt.hash(request.payload.record.password, 10),
                  password: undefined,
                }
              }
              return request
            },
          },
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
        }
      }
    }],
  }
  const adminBro = new AdminBro(AdminBroOptions)
  const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email })
        if (user) {
          if (password === user.encryptedPassword) {
            return user
          }
        }
      return false
    },
    cookiePassword: 'session Key',
  })
app.use(adminBro.options.rootPath, router)

app.listen(8000, function () {
    console.log('Listening to Port 8000');
});