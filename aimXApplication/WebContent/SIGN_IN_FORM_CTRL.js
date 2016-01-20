/**
 * handles the controler function for the sign in page
 */

<input name="newPassword" ng-model="password.new">
	<input match-password="newPassword" name="confirmPassword"
		ng-model="password.confirm">

	<form ng-app="aimXApp" name="passwordForm" autocomplete="off" novalidate=""
		ng-submit="submit(password)">
		<fieldset>
			<label for="newPassword">New Password</label> <input type="password"
				name="newPassword" ng-model="password.new" required="" />
			<div class="clearfix">
				<div ng-messages="passwordForm.newPassword.$error"
					ng-if="passwordForm.$submitted || passwordForm.newPassword.$dirty"
					ng-messages-multiple="ng-messages-multiple"
					class="error-messages slide-right">
					<div ng-message="required" class="message slide-left">You did not enter a field name</div>
		<div ng-message="passwordMatch" class="message slide-left">
Your passwords did not match.</div>
				</div>
			</div>
			<label for="confirmPassword">Re-Type New Password</label> <input
				type="password" name="confirmPassword" ng-model="password.confirm"
				match-password="newPassword" required="" />
			<div class="clearfix">
				<div ng-messages="passwordForm.confirmPassword.$error"
					ng-if="passwordForm.$submitted || passwordForm.confirmPassword.$dirty"
					ng-messages-multiple="ng-messages-multiple"
					class="error-messages slide-right">
					<div ng-message="required" class="message slide-left">You did
						not enter a field name</div>
					<div ng-message="passwordMatch" class="message slide-left">Your
						passwords did not match</div>
				</div>
			</div>
		</fieldset>
		<button>Submit</button>
	</form>
