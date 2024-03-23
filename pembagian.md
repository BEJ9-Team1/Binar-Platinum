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
//AUTH//
router.post('/auth/register', userController.create) // {url}/user/register
router.post('/auth/login', authController.login)
router.post('/auth/logout', JWTAuth, authController.logout)

//CART//
router.post('/cart', JWTAuth, RoleGuard('buyer'), cartController.create);
router.get('/cart',JWTAuth, RoleGuard('buyer'), cartController.index);
router.get('/cart/:id', cartController.findCartItems);
router.patch('/cart/:id', JWTAuth, RoleGuard('buyer'), cartController.updateQty);

//MEDIA
router.get('/media', mediaController.index)
router.get('/media/:id',mediaController.find)
router.post('/media', JWTAuth, RoleGuard('buyer', 'merchant'), upload.single("picture"),mediaController.create)
router.put('/media/:id', JWTAuth, RoleGuard('buyer', 'merchant'), upload.single("picture"),mediaController.updateImage)
router.delete('/media/:id', JWTAuth, RoleGuard('buyer', 'merchant'),mediaController.destroy)

//MERCHANT//
router.get('/merchant', merchantController.index)
router.post('/merchant', JWTAuth, RoleGuard('buyer', 'merchant'), merchantController.create)
router.get('/merchant/:name', merchantController.find)
============================================ DUA ======================================================================= LUCKY
router.put('/merchant/', JWTAuth, RoleGuard('merchant'), merchantController.update)

// PRODUCT //
router.get('/products', ProductController.index)
router.post('/products', JWTAuth, RoleGuard('merchant'), ProductController.create)
router.get('/products/:id', ProductController.findById)
router.put('/products/:id', JWTAuth, RoleGuard('merchant'), ProductController.update)
router.delete('/products/:id', JWTAuth, RoleGuard('merchant'), ProductController.delete)

//ORDER//
router.get('/order/', JWTAuth, RoleGuard('buyer', 'seller'), orderController.index) //getAllOrder
router.get('/order/:id',JWTAuth, RoleGuard('buyer', 'seller'), orderController.find)
router.patch('/order/:id',JWTAuth, RoleGuard('buyer', 'seller'), orderController.update)

// USER CONTROLLER //
router.get('/user', JWTAuth, userController.index)
router.get('/user/:email', userController.find)
router.put('/user/',JWTAuth, userController.update)
router.delete('/user/:id', userController.destroy)
========================================= TIGA ====================================================== RIDHO


//AUTH//
router.post('/auth/register', userController.create) // {url}/user/register
router.post('/auth/login', authController.login)
router.post('/auth/logout', JWTAuth, authController.logout)
//CART//
router.post('/cart', JWTAuth, RoleGuard('buyer'), cartController.create);
router.get('/cart',JWTAuth, RoleGuard('buyer'), cartController.index);
router.get('/cart/:id', cartController.findCartItems);
router.patch('/cart/:id', JWTAuth, RoleGuard('buyer'), cartController.updateQty);
//MEDIA
router.get('/media', mediaController.index)
router.get('/media/:id',mediaController.find)
router.post('/media', JWTAuth, RoleGuard('buyer', 'merchant'), upload.single("picture"),mediaController.create)
router.put('/media/:id', JWTAuth, RoleGuard('buyer', 'merchant'), upload.single("picture"),mediaController.updateImage)
router.delete('/media/:id', JWTAuth, RoleGuard('buyer', 'merchant'),mediaController.destroy)
//MERCHANT//
router.get('/merchant', merchantController.index)
router.post('/merchant', JWTAuth, RoleGuard('buyer', 'merchant'), merchantController.create)
router.get('/merchant/:name', merchantController.find)
============================================ DUA ======================================== LUCKY