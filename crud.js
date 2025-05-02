var app = angular.module("myApp", []);

app.controller("myController", function ($scope, $http) {
    $scope.users = [];
    $scope.newUser = {};

    // GET: Fetch all users
    $scope.fetchUsers = function () {
        $http.get("https://jsonplaceholder.typicode.com/users")
            .then(function (response) {
                $scope.users = response.data;
            })
            .catch(function (error) {
                console.error("Error fetching users:", error);
            });
    };

    // POST: Add new user
    $scope.addUser = function () {
        if (!$scope.newUser.name || !$scope.newUser.username || !$scope.newUser.email) {
            alert("All fields are required!");
            return;
        }

        $http.post("https://jsonplaceholder.typicode.com/users", $scope.newUser)
            .then(function (response) {
                alert("User added successfully!");
                response.data.id = $scope.users.length + 1; // Mock ID
                $scope.users.push(response.data); // Add user to list
                $scope.newUser = {}; // Clear input fields
            })
            .catch(function (error) {
                console.error("Error adding user:", error);
            });
    };

    // PUT: Update user
    $scope.updateUser = function (user) {
        let updatedData = { name: "Updated " + user.name, email: "updated@example.com" };

        $http.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, updatedData)
            .then(function (response) {
                alert("User updated successfully!");
                user.name = updatedData.name; // Update UI
                user.email = updatedData.email;
            })
            .catch(function (error) {
                console.error("Error updating user:", error);
            });
    };

    // DELETE: Remove user
    $scope.deleteUser = function (user) {
        if (confirm("Are you sure you want to delete this user?")) {
            $http.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
                .then(function () {
                    alert("User deleted successfully!");
                    $scope.users = $scope.users.filter(u => u.id !== user.id);
                })
                .catch(function (error) {
                    console.error("Error deleting user:", error);
                });
        }
    };
});
