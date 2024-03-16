//ADDRESS MERCHANT & BUYER//
router.get('/address', AddressController.index)
router.post('/address', JWTAuth, RoleGuard('buyer', 'merchant'), AddressController.create)
router.get('/address/:id', JWTAuth, RoleGuard('buyer', 'merchant'),AddressController.find)
router.put('/address/:id', JWTAuth, RoleGuard('buyer', 'merchant'), AddressController.update)
router.delete('/address/:id', JWTAuth, RoleGuard('buyer', 'merchant'), AddressController.destroy)

//CATEGORY//
router.get('/category', categoryController.index)
router.post('/category', JWTAuth, RoleGuard('admin'), categoryController.create)
router.patch('/category/:id', JWTAuth, RoleGuard('admin'), categoryController.update)
router.get('/category/:name', categoryController.find)
router.delete('/category/:id', JWTAuth, RoleGuard('admin'), categoryController.destroy)

//PAYMENT//
router.get('/payment', paymentController.index)
router.post('/payment', JWTAuth, RoleGuard('admin'), paymentController.create)
router.get('/payment/:name', paymentController.find)
router.put('/payment/:id', JWTAuth, RoleGuard('admin'), paymentController.update)
router.delete('/payment/:id', JWTAuth, RoleGuard('admin'), paymentController.destroy)
=========================================== SATU ======================================== ROBBI
