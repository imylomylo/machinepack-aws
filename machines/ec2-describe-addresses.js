module.exports = {


  friendlyName: 'Describe Elastic IP Addresses',


  description: 'Describes one or more of your Elastic IP addresses.',


  extendedDescription: '',


  inputs: {

    accessKeyId: {
      description: 'AWS IAM user access key id.',
      example: 'akid',
      required: true
    },

    secretAccessKey: {
      description: 'AWS IAM user secret access key',
      example: 'secret',
      required: true
    },

    region: {
      description: 'Which region to use. Defaults to us-west-2',
      example: 'us-east-1'
    },

    apiVersion: {
      description: 'Which api version to use. Defaults to: latest',
      example: '2016-11-15'
    },

    Filters: {
      description: 'To describe your Elastic IP addresses for EC2-VPC',
      example: [
        {
          Name: "domain",
          Values: ["vpc"]
        }
      ],
      required: false
    },
  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      example: {
        Addresses: [{
          Domain: 'standard',
          InstanceId: 'i-57s4f1824733',
          PublicIp: '198.51.100.0',
        },
        {
          AllocationId: "eipalloc-12345678",
          AssociationId: "eipassoc-12345678",
          Domain: "vpc",
          InstanceId: "i-1234567890abcdef0",
          NetworkInterfaceId: "eni-12345678",
          NetworkInterfaceOwnerId: "123456789012",
          PrivateIpAddress: "10.0.1.241",
          PublicIp: "203.0.113.0"
        }
        ]
      }
    }
  },


  fn: function (inputs, exits) {

    // Dependencies
    var AWS = require('aws-sdk');

    var config = {
      accessKeyId: inputs.accessKeyId,
      secretAccessKey: inputs.secretAccessKey,
      region: inputs.region || 'us-east-1',
      apiVersion: inputs.apiVersion || 'latest'
    };

    // Construct the ECS Service
    var ec2 = new AWS.EC2(config);

    var params = {
    };

    if (inputs.nextToken) params.NextToken = inputs.nextToken;
    if (inputs.maxResults) params.MaxResults = inputs.maxResults;

    ec2.describeAddresses(params, function (err, data) {
      if (err) {
        return exits.error(err);
      }

      exits.success(data);
    });


  }
};