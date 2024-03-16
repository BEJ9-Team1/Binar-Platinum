//ADDRESS MERCHANT & BUYER//
router.get('/address', AddressController.index) done
router.get('/address/:id', JWTAuth, RoleGuard('buyer', 'merchant'),AddressController.find) done
router.delete('/address/:id', JWTAuth, RoleGuard('buyer', 'merchant'), AddressController.destroy) done

//CATEGORY//
router.get('/category', categoryController.index) done
router.post('/category', JWTAuth, RoleGuard('admin'), categoryController.create) done
router.patch('/category/:id', JWTAuth, RoleGuard('admin'), categoryController.update) done
router.get('/category/:name', categoryController.find) done
router.delete('/category/:id', JWTAuth, RoleGuard('admin'), categoryController.destroy)

//PAYMENT//
router.get('/payment', paymentController.index)
router.post('/payment', JWTAuth, RoleGuard('admin'), paymentController.create)
router.get('/payment/:name', paymentController.find)
router.put('/payment/:id', JWTAuth, RoleGuard('admin'), paymentController.update)
router.delete('/payment/:id', JWTAuth, RoleGuard('admin'), paymentController.destroy)
=========================================== SATU ======================================== ROBBI
