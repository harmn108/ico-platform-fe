import {Injectable} from '@angular/core';

@Injectable()
export class ErrorService {

    private ErrorMessage = {
        default: 'Something went wrong',
        signature_verification_error: 'Incorrect recovery phrase',
        system_error: 'System error. Please try again later',
        email_error: 'E-Mail syntax is incorrect',
        incorrect_wallet_type: 'Incorrect wallet type, please choose again',
        free_wallet_not_found: 'Free wallet not found',
        user_not_found: 'Incorrect Url',
        code_expired: 'Code expired',
        article_not_found: 'The article you are looking for cannot be found',
        stories_not_found: 'There are no stories associated with that tag ',
        invalid_amount_error: 'Please enter a valid amount',
        accout_update_balance_error: 'Balance Not Enough For Update Account',
        create_content_balance_error: 'Balance Not Enough For Create Article',
        account_not_found: 'Account not found',
        form_not_submitted: 'The form was filled in incorrectly. Please, try again',
        user_already_exist: 'This email was already taken',
        transfer_account_id_not_found: 'Recipient ID is not found',
        cant_transfer_in_same_account: 'Can’t transfer to the same account',
        your_balance_is_not_enough: 'Your balance is not enough',
        requested_account_doesnt_exist: 'Requested account doesn’t exist',
        transfer_failed: 'Seems like we’re having technical problems. Please try again later',
        image_upload_error: 'Image upload error. Please check image size and format',
        empty_content: 'Please fill in all required fields',
        empty_meta: 'Please fill in all required fields',
        image_hash_upload_error: 'Seems like we’re having technical problems. Please upload image again',
        thumbnail_hash_upload_error: 'Seems like we’re having technical problems. Please upload image again',
        content_not_submited: 'Something went wrong',
        content_submit_failed: 'Something went wrong',
        error_draft_validating_request: 'Please fill in all required fields',
        no_such_draft_associated_with_user: 'User is not authorized',
        image_not_found: 'Image type is wrong',
        update_account_id_not_found: 'Your activities are not secure. Please get authorised',
        account_not_update: 'Seems like we’re having technical problems. Please try again later',
        subscriber_not_found: 'Seems like we’re having technical problems. Please try again later',
        self_subscription: 'You are not allowed to follow yourself',
        empty_username: 'Seems like we’re having technical problems. Please try again later',
        complete_registration: 'Please complete your registration',
        balance_exceeded_error: 'Current balance exceeded'

    };

    constructor() {
    }

    getError(key) {
        return this.ErrorMessage[key] ? this.ErrorMessage[key] : this.ErrorMessage['default'];
    }

}
