'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ecommerce-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AddressesModule.html" data-type="entity-link" >AddressesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AddressesModule-874aaf524dd387597c37fa8438e76f22c5d236cf96e3df15dd0653e01227680b90598f55fe7b0cbaceb2f803b14f4f531e216d0dad7c67a33ebc99ce99b71bea"' : 'data-bs-target="#xs-controllers-links-module-AddressesModule-874aaf524dd387597c37fa8438e76f22c5d236cf96e3df15dd0653e01227680b90598f55fe7b0cbaceb2f803b14f4f531e216d0dad7c67a33ebc99ce99b71bea"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AddressesModule-874aaf524dd387597c37fa8438e76f22c5d236cf96e3df15dd0653e01227680b90598f55fe7b0cbaceb2f803b14f4f531e216d0dad7c67a33ebc99ce99b71bea"' :
                                            'id="xs-controllers-links-module-AddressesModule-874aaf524dd387597c37fa8438e76f22c5d236cf96e3df15dd0653e01227680b90598f55fe7b0cbaceb2f803b14f4f531e216d0dad7c67a33ebc99ce99b71bea"' }>
                                            <li class="link">
                                                <a href="controllers/AddressesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AddressesModule-874aaf524dd387597c37fa8438e76f22c5d236cf96e3df15dd0653e01227680b90598f55fe7b0cbaceb2f803b14f4f531e216d0dad7c67a33ebc99ce99b71bea"' : 'data-bs-target="#xs-injectables-links-module-AddressesModule-874aaf524dd387597c37fa8438e76f22c5d236cf96e3df15dd0653e01227680b90598f55fe7b0cbaceb2f803b14f4f531e216d0dad7c67a33ebc99ce99b71bea"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AddressesModule-874aaf524dd387597c37fa8438e76f22c5d236cf96e3df15dd0653e01227680b90598f55fe7b0cbaceb2f803b14f4f531e216d0dad7c67a33ebc99ce99b71bea"' :
                                        'id="xs-injectables-links-module-AddressesModule-874aaf524dd387597c37fa8438e76f22c5d236cf96e3df15dd0653e01227680b90598f55fe7b0cbaceb2f803b14f4f531e216d0dad7c67a33ebc99ce99b71bea"' }>
                                        <li class="link">
                                            <a href="injectables/AddressesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-7cb6a5e9a251bc911613106c152164d112408189213cd73cb67c1677fc0ae2f725c28aac2d02c2df06528ac59596afbf3e9213f1fbffc817b1253b9e83d80d9b"' : 'data-bs-target="#xs-controllers-links-module-AppModule-7cb6a5e9a251bc911613106c152164d112408189213cd73cb67c1677fc0ae2f725c28aac2d02c2df06528ac59596afbf3e9213f1fbffc817b1253b9e83d80d9b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-7cb6a5e9a251bc911613106c152164d112408189213cd73cb67c1677fc0ae2f725c28aac2d02c2df06528ac59596afbf3e9213f1fbffc817b1253b9e83d80d9b"' :
                                            'id="xs-controllers-links-module-AppModule-7cb6a5e9a251bc911613106c152164d112408189213cd73cb67c1677fc0ae2f725c28aac2d02c2df06528ac59596afbf3e9213f1fbffc817b1253b9e83d80d9b"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-7cb6a5e9a251bc911613106c152164d112408189213cd73cb67c1677fc0ae2f725c28aac2d02c2df06528ac59596afbf3e9213f1fbffc817b1253b9e83d80d9b"' : 'data-bs-target="#xs-injectables-links-module-AppModule-7cb6a5e9a251bc911613106c152164d112408189213cd73cb67c1677fc0ae2f725c28aac2d02c2df06528ac59596afbf3e9213f1fbffc817b1253b9e83d80d9b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7cb6a5e9a251bc911613106c152164d112408189213cd73cb67c1677fc0ae2f725c28aac2d02c2df06528ac59596afbf3e9213f1fbffc817b1253b9e83d80d9b"' :
                                        'id="xs-injectables-links-module-AppModule-7cb6a5e9a251bc911613106c152164d112408189213cd73cb67c1677fc0ae2f725c28aac2d02c2df06528ac59596afbf3e9213f1fbffc817b1253b9e83d80d9b"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-14b1e153c5937c77e53c4176be5cfe6e6c0f6757015389d763943f5ad0e2928075b0128c07487c8236470248bb54c36bfb36160c9dda59d2c746c170620d6282"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-14b1e153c5937c77e53c4176be5cfe6e6c0f6757015389d763943f5ad0e2928075b0128c07487c8236470248bb54c36bfb36160c9dda59d2c746c170620d6282"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-14b1e153c5937c77e53c4176be5cfe6e6c0f6757015389d763943f5ad0e2928075b0128c07487c8236470248bb54c36bfb36160c9dda59d2c746c170620d6282"' :
                                            'id="xs-controllers-links-module-AuthModule-14b1e153c5937c77e53c4176be5cfe6e6c0f6757015389d763943f5ad0e2928075b0128c07487c8236470248bb54c36bfb36160c9dda59d2c746c170620d6282"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-14b1e153c5937c77e53c4176be5cfe6e6c0f6757015389d763943f5ad0e2928075b0128c07487c8236470248bb54c36bfb36160c9dda59d2c746c170620d6282"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-14b1e153c5937c77e53c4176be5cfe6e6c0f6757015389d763943f5ad0e2928075b0128c07487c8236470248bb54c36bfb36160c9dda59d2c746c170620d6282"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-14b1e153c5937c77e53c4176be5cfe6e6c0f6757015389d763943f5ad0e2928075b0128c07487c8236470248bb54c36bfb36160c9dda59d2c746c170620d6282"' :
                                        'id="xs-injectables-links-module-AuthModule-14b1e153c5937c77e53c4176be5cfe6e6c0f6757015389d763943f5ad0e2928075b0128c07487c8236470248bb54c36bfb36160c9dda59d2c746c170620d6282"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateTokentProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenerateTokentProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokensProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokensProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SignInProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CategoriesModule-273bae7496d6beb09b50fd304771875df0e15702ef8626f8106579443158f0bd0ed9d54b80cc7fc432d33351d5e681a4879f64f6f6ac046517d1fba0fbcda07b"' : 'data-bs-target="#xs-controllers-links-module-CategoriesModule-273bae7496d6beb09b50fd304771875df0e15702ef8626f8106579443158f0bd0ed9d54b80cc7fc432d33351d5e681a4879f64f6f6ac046517d1fba0fbcda07b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-273bae7496d6beb09b50fd304771875df0e15702ef8626f8106579443158f0bd0ed9d54b80cc7fc432d33351d5e681a4879f64f6f6ac046517d1fba0fbcda07b"' :
                                            'id="xs-controllers-links-module-CategoriesModule-273bae7496d6beb09b50fd304771875df0e15702ef8626f8106579443158f0bd0ed9d54b80cc7fc432d33351d5e681a4879f64f6f6ac046517d1fba0fbcda07b"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CategoriesModule-273bae7496d6beb09b50fd304771875df0e15702ef8626f8106579443158f0bd0ed9d54b80cc7fc432d33351d5e681a4879f64f6f6ac046517d1fba0fbcda07b"' : 'data-bs-target="#xs-injectables-links-module-CategoriesModule-273bae7496d6beb09b50fd304771875df0e15702ef8626f8106579443158f0bd0ed9d54b80cc7fc432d33351d5e681a4879f64f6f6ac046517d1fba0fbcda07b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-273bae7496d6beb09b50fd304771875df0e15702ef8626f8106579443158f0bd0ed9d54b80cc7fc432d33351d5e681a4879f64f6f6ac046517d1fba0fbcda07b"' :
                                        'id="xs-injectables-links-module-CategoriesModule-273bae7496d6beb09b50fd304771875df0e15702ef8626f8106579443158f0bd0ed9d54b80cc7fc432d33351d5e681a4879f64f6f6ac046517d1fba0fbcda07b"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateCategoryProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateCategoryProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateManyCategoriesProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateManyCategoriesProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeleteCategoryByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteCategoryByIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindAllCategoriesProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindAllCategoriesProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindCategoryByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindCategoryByIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReactivateCategoryByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReactivateCategoryByIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateCategoryByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateCategoryByIdProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrdersModule-645a449033492acdcaeb315f9ad674527be95198f5e63bbe3c2c9449baef7874c44cbb5e9dc81545150aeaf97168efe2bfdc8b6e514c8b95499cfbae3b2ce568"' : 'data-bs-target="#xs-controllers-links-module-OrdersModule-645a449033492acdcaeb315f9ad674527be95198f5e63bbe3c2c9449baef7874c44cbb5e9dc81545150aeaf97168efe2bfdc8b6e514c8b95499cfbae3b2ce568"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrdersModule-645a449033492acdcaeb315f9ad674527be95198f5e63bbe3c2c9449baef7874c44cbb5e9dc81545150aeaf97168efe2bfdc8b6e514c8b95499cfbae3b2ce568"' :
                                            'id="xs-controllers-links-module-OrdersModule-645a449033492acdcaeb315f9ad674527be95198f5e63bbe3c2c9449baef7874c44cbb5e9dc81545150aeaf97168efe2bfdc8b6e514c8b95499cfbae3b2ce568"' }>
                                            <li class="link">
                                                <a href="controllers/OrdersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrdersModule-645a449033492acdcaeb315f9ad674527be95198f5e63bbe3c2c9449baef7874c44cbb5e9dc81545150aeaf97168efe2bfdc8b6e514c8b95499cfbae3b2ce568"' : 'data-bs-target="#xs-injectables-links-module-OrdersModule-645a449033492acdcaeb315f9ad674527be95198f5e63bbe3c2c9449baef7874c44cbb5e9dc81545150aeaf97168efe2bfdc8b6e514c8b95499cfbae3b2ce568"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrdersModule-645a449033492acdcaeb315f9ad674527be95198f5e63bbe3c2c9449baef7874c44cbb5e9dc81545150aeaf97168efe2bfdc8b6e514c8b95499cfbae3b2ce568"' :
                                        'id="xs-injectables-links-module-OrdersModule-645a449033492acdcaeb315f9ad674527be95198f5e63bbe3c2c9449baef7874c44cbb5e9dc81545150aeaf97168efe2bfdc8b6e514c8b95499cfbae3b2ce568"' }>
                                        <li class="link">
                                            <a href="injectables/CreateManyOrderProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateManyOrderProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateOrderProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateOrderProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeleteOrderByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteOrderByIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OrdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateOrderByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateOrderByIdProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaginationModule.html" data-type="entity-link" >PaginationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaginationModule-4e286448d1b0d43ee3299446ae292d33c990c5819b8c6aacd7cdd3f0bb7ea8c6f2ad40762e37aeb9c4bcf0c6a6e964f60ed545af2b12022f9024e7897330d1bd"' : 'data-bs-target="#xs-injectables-links-module-PaginationModule-4e286448d1b0d43ee3299446ae292d33c990c5819b8c6aacd7cdd3f0bb7ea8c6f2ad40762e37aeb9c4bcf0c6a6e964f60ed545af2b12022f9024e7897330d1bd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaginationModule-4e286448d1b0d43ee3299446ae292d33c990c5819b8c6aacd7cdd3f0bb7ea8c6f2ad40762e37aeb9c4bcf0c6a6e964f60ed545af2b12022f9024e7897330d1bd"' :
                                        'id="xs-injectables-links-module-PaginationModule-4e286448d1b0d43ee3299446ae292d33c990c5819b8c6aacd7cdd3f0bb7ea8c6f2ad40762e37aeb9c4bcf0c6a6e964f60ed545af2b12022f9024e7897330d1bd"' }>
                                        <li class="link">
                                            <a href="injectables/PaginationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductsModule-39939960748f16b8bb45cdac0ede678981732e498475bfb59ef5306f7f976336da54374df9fb0ed4da9c09c29ad573555b38e5e2b49f103111bae967b030e340"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-39939960748f16b8bb45cdac0ede678981732e498475bfb59ef5306f7f976336da54374df9fb0ed4da9c09c29ad573555b38e5e2b49f103111bae967b030e340"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-39939960748f16b8bb45cdac0ede678981732e498475bfb59ef5306f7f976336da54374df9fb0ed4da9c09c29ad573555b38e5e2b49f103111bae967b030e340"' :
                                            'id="xs-controllers-links-module-ProductsModule-39939960748f16b8bb45cdac0ede678981732e498475bfb59ef5306f7f976336da54374df9fb0ed4da9c09c29ad573555b38e5e2b49f103111bae967b030e340"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-39939960748f16b8bb45cdac0ede678981732e498475bfb59ef5306f7f976336da54374df9fb0ed4da9c09c29ad573555b38e5e2b49f103111bae967b030e340"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-39939960748f16b8bb45cdac0ede678981732e498475bfb59ef5306f7f976336da54374df9fb0ed4da9c09c29ad573555b38e5e2b49f103111bae967b030e340"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-39939960748f16b8bb45cdac0ede678981732e498475bfb59ef5306f7f976336da54374df9fb0ed4da9c09c29ad573555b38e5e2b49f103111bae967b030e340"' :
                                        'id="xs-injectables-links-module-ProductsModule-39939960748f16b8bb45cdac0ede678981732e498475bfb59ef5306f7f976336da54374df9fb0ed4da9c09c29ad573555b38e5e2b49f103111bae967b030e340"' }>
                                        <li class="link">
                                            <a href="injectables/CreateManyProductsProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateManyProductsProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateProductProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateProductProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeleteProductByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteProductByIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindAllProductProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindAllProductProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindProductByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindProductByIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReactivateProductByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReactivateProductByIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateProductByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateProductByIdProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewsModule.html" data-type="entity-link" >ReviewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReviewsModule-6b9c0e312c2e156c08cf4243c328f19a634ca8797abde0a62213e0af9fd62ec114f0e76542f893df3e6c3852032cc02cd429df89df77a7225764b59fd595068e"' : 'data-bs-target="#xs-controllers-links-module-ReviewsModule-6b9c0e312c2e156c08cf4243c328f19a634ca8797abde0a62213e0af9fd62ec114f0e76542f893df3e6c3852032cc02cd429df89df77a7225764b59fd595068e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewsModule-6b9c0e312c2e156c08cf4243c328f19a634ca8797abde0a62213e0af9fd62ec114f0e76542f893df3e6c3852032cc02cd429df89df77a7225764b59fd595068e"' :
                                            'id="xs-controllers-links-module-ReviewsModule-6b9c0e312c2e156c08cf4243c328f19a634ca8797abde0a62213e0af9fd62ec114f0e76542f893df3e6c3852032cc02cd429df89df77a7225764b59fd595068e"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReviewsModule-6b9c0e312c2e156c08cf4243c328f19a634ca8797abde0a62213e0af9fd62ec114f0e76542f893df3e6c3852032cc02cd429df89df77a7225764b59fd595068e"' : 'data-bs-target="#xs-injectables-links-module-ReviewsModule-6b9c0e312c2e156c08cf4243c328f19a634ca8797abde0a62213e0af9fd62ec114f0e76542f893df3e6c3852032cc02cd429df89df77a7225764b59fd595068e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewsModule-6b9c0e312c2e156c08cf4243c328f19a634ca8797abde0a62213e0af9fd62ec114f0e76542f893df3e6c3852032cc02cd429df89df77a7225764b59fd595068e"' :
                                        'id="xs-injectables-links-module-ReviewsModule-6b9c0e312c2e156c08cf4243c328f19a634ca8797abde0a62213e0af9fd62ec114f0e76542f893df3e6c3852032cc02cd429df89df77a7225764b59fd595068e"' }>
                                        <li class="link">
                                            <a href="injectables/ReviewsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-3f72998de82d77a40d3bda2f3ba75d434701ee839f01d8550750c3016d9381358d07cefe1fb1d984e0bcffafb5335ec4b11abb2eb5b1246709bd4b1d535727a2"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-3f72998de82d77a40d3bda2f3ba75d434701ee839f01d8550750c3016d9381358d07cefe1fb1d984e0bcffafb5335ec4b11abb2eb5b1246709bd4b1d535727a2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-3f72998de82d77a40d3bda2f3ba75d434701ee839f01d8550750c3016d9381358d07cefe1fb1d984e0bcffafb5335ec4b11abb2eb5b1246709bd4b1d535727a2"' :
                                            'id="xs-controllers-links-module-UsersModule-3f72998de82d77a40d3bda2f3ba75d434701ee839f01d8550750c3016d9381358d07cefe1fb1d984e0bcffafb5335ec4b11abb2eb5b1246709bd4b1d535727a2"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-3f72998de82d77a40d3bda2f3ba75d434701ee839f01d8550750c3016d9381358d07cefe1fb1d984e0bcffafb5335ec4b11abb2eb5b1246709bd4b1d535727a2"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-3f72998de82d77a40d3bda2f3ba75d434701ee839f01d8550750c3016d9381358d07cefe1fb1d984e0bcffafb5335ec4b11abb2eb5b1246709bd4b1d535727a2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-3f72998de82d77a40d3bda2f3ba75d434701ee839f01d8550750c3016d9381358d07cefe1fb1d984e0bcffafb5335ec4b11abb2eb5b1246709bd4b1d535727a2"' :
                                        'id="xs-injectables-links-module-UsersModule-3f72998de82d77a40d3bda2f3ba75d434701ee839f01d8550750c3016d9381358d07cefe1fb1d984e0bcffafb5335ec4b11abb2eb5b1246709bd4b1d535727a2"' }>
                                        <li class="link">
                                            <a href="injectables/CreateManyUsersProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateManyUsersProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateUsersProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUsersProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeleteUserByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteUserByIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindAllUsersProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindAllUsersProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneByEmailProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneByEmailProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneByIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReactivateUserByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReactivateUserByIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateUserByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateUserByIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AddressesController.html" data-type="entity-link" >AddressesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoriesController.html" data-type="entity-link" >CategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OrdersController.html" data-type="entity-link" >OrdersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ReviewsController.html" data-type="entity-link" >ReviewsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Address.html" data-type="entity-link" >Address</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Categories.html" data-type="entity-link" >Categories</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Order.html" data-type="entity-link" >Order</a>
                                </li>
                                <li class="link">
                                    <a href="entities/OrderItem.html" data-type="entity-link" >OrderItem</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Product.html" data-type="entity-link" >Product</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Review.html" data-type="entity-link" >Review</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateManyCategoriesDto.html" data-type="entity-link" >CreateManyCategoriesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateManyOrdersDto.html" data-type="entity-link" >CreateManyOrdersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateManyProductsDto.html" data-type="entity-link" >CreateManyProductsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateManyUsersDto.html" data-type="entity-link" >CreateManyUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrderDto.html" data-type="entity-link" >CreateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrderItemDto.html" data-type="entity-link" >CreateOrderItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AddressesService.html" data-type="entity-link" >AddressesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Argon2Provider.html" data-type="entity-link" >Argon2Provider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BulkCreateProvider.html" data-type="entity-link" >BulkCreateProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriesService.html" data-type="entity-link" >CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateCategoryProvider.html" data-type="entity-link" >CreateCategoryProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateManyCategoriesProvider.html" data-type="entity-link" >CreateManyCategoriesProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateManyOrderProvider.html" data-type="entity-link" >CreateManyOrderProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateManyProductsProvider.html" data-type="entity-link" >CreateManyProductsProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateManyUsersProvider.html" data-type="entity-link" >CreateManyUsersProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateOrderProvider.html" data-type="entity-link" >CreateOrderProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateProductProvider.html" data-type="entity-link" >CreateProductProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateUsersProvider.html" data-type="entity-link" >CreateUsersProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataResponseInterceptor.html" data-type="entity-link" >DataResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeleteCategoryByIdProvider.html" data-type="entity-link" >DeleteCategoryByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeleteOrderByIdProvider.html" data-type="entity-link" >DeleteOrderByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeleteProductByIdProvider.html" data-type="entity-link" >DeleteProductByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeleteUserByIdProvider.html" data-type="entity-link" >DeleteUserByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindAllCategoriesProvider.html" data-type="entity-link" >FindAllCategoriesProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindAllProductProvider.html" data-type="entity-link" >FindAllProductProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindAllUsersProvider.html" data-type="entity-link" >FindAllUsersProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindCategoryByIdProvider.html" data-type="entity-link" >FindCategoryByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindOneByEmailProvider.html" data-type="entity-link" >FindOneByEmailProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindOneByIdProvider.html" data-type="entity-link" >FindOneByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindProductByIdProvider.html" data-type="entity-link" >FindProductByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GenerateTokentProvider.html" data-type="entity-link" >GenerateTokentProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingProvider.html" data-type="entity-link" >HashingProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrdersService.html" data-type="entity-link" >OrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaginationProvider.html" data-type="entity-link" >PaginationProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReactivateCategoryByIdProvider.html" data-type="entity-link" >ReactivateCategoryByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReactivateProductByIdProvider.html" data-type="entity-link" >ReactivateProductByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReactivateUserByIdProvider.html" data-type="entity-link" >ReactivateUserByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokensProvider.html" data-type="entity-link" >RefreshTokensProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReviewsService.html" data-type="entity-link" >ReviewsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SignInProvider.html" data-type="entity-link" >SignInProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateCategoryByIdProvider.html" data-type="entity-link" >UpdateCategoryByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateOrderByIdProvider.html" data-type="entity-link" >UpdateOrderByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateProductByIdProvider.html" data-type="entity-link" >UpdateProductByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateUserByIdProvider.html" data-type="entity-link" >UpdateUserByIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link" >AuthenticationGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActiveUserData.html" data-type="entity-link" >ActiveUserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppConfig.html" data-type="entity-link" >AppConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatabaseConfig.html" data-type="entity-link" >DatabaseConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});