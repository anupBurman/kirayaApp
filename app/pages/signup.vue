
<template>
    <div class="container-fluid form_bg px-0 template">
        <div class="row px-lg-5 p-3 ">
            <h5 class="text-center"> Enter Credentials to Login </h5>
            <div class="col-lg-4 col-md-4"> </div>
            <div class="col-lg-4 col-md-4 text-start">
                <div class="form p-4">
                    <form>
                        <div class="form-group">
                            <label>
                                <i class="fa fa-user" aria-hidden="true"> </i>
                                Please Enter Name
                                <span class="text_warning">*</span>
                            </label>
                            <input type="text" class="form-control" placeholder="Name" required>
                        </div>
                        <div class="form-group ">
                            <label>
                                <i class="fa fa-envelope" aria-hidden="true"> </i>
                                Please Enter Email
                                <span class="text_warning">*</span>
                            </label>
                            <input type="email" class="form-control" placeholder="Email" required>
                        </div>

                        <div class="form-group ">
                            <label class="d_flex_between">
                                <span>
                                    <i class="fa fa-unlock-alt" aria-hidden="true"> </i>
                                    Password
                                    <span class="text_warning">*</span>
                                </span>
                                <i class="fa fa-info-circle px-2 info_btn">i</i>
                                <span class="info_card alert alert-warning">
                                    <ul class="ps-2">
                                        <li> Minimum length must be 6 characters and maximum 12 characters </li>
                                        <li> should be atleast 1 numeric character. </li>
                                    </ul>
                                </span>
                            </label>
                            <input type="password" class="form-control" placeholder="Password" minlength="6"
                                maxlength="8" required>
                        </div>

                        <div class="form-group ">
                            <label>
                                <i class="fa fa-unlock-alt" aria-hidden="true"> </i>
                                Confirm Password
                                <span class="text_warning">*</span>
                            </label>
                            <input type="password" class="form-control" placeholder="Confirm Password" minlength="6"
                                maxlength="8" required>
                        </div>
                        <div>
                            <button type="button" class="btn bg_purple text-white w-100 ">
                                <span> Register </span>
                                <span> submiting... </span> </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-4 col-md-4"> </div>
        </div>
    </div>

</template>
<script>
definePageMeta({
    layout: 'custom',
});

</script>