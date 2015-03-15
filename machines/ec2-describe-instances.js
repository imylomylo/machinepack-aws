module.exports = {


  friendlyName: 'EC2 describe instances',


  description: 'Describes one or more of your instances.',


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
      example: 'us-west-2'
    },

    apiVersion: {
      description: 'Which api version to use. Defaults to: latest',
      example: '2014-11-13'
    },

    instanceIds: {
      description: 'One or more instance IDs.',
      example: ['STRING'],
      required: true
    },

    nextToken: {
      description: 'The token for the next set of items to return.',
      example: 'aTokenValue'
    },

    maxResults: {
      description: 'The maximum number of items to return for this call.',
      example: 100
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      example: {
        Reservations: [{
          ReservationId: 'r-7801b374',
          OwnerId: '57s4f1824733',
          Groups: [],
          Instances: [{
            InstanceId: 'i-783aff67',
            ImageId: 'ami-4esc2a7d',
            State: {
              Code: 16,
              Name: 'running'
            },
            PrivateDnsName: 'ip-10-0-0-9.us-west-2.compute.internal',
            PublicDnsName: 'ec2-52-69-178-30.us-west-2.compute.amazonaws.com',
            StateTransitionReason: '',
            KeyName: 'MyKey',
            AmiLaunchIndex: 0,
            ProductCodes: [],
            InstanceType: 'm3.xlarge',
            LaunchTime: 'Sat Mar 14 2015 12:06:13 GMT-0700 (PDT)',
            Placement: {
              AvailabilityZone: 'us-west-2a',
              GroupName: '',
              Tenancy: 'default'
            },
            Monitoring: {
              State: 'disabled'
            },
            SubnetId: 'subnet-530fa024',
            VpcId: 'vpc-e7a81882',
            PrivateIpAddress: '10.0.0.9',
            PublicIpAddress: '51.65.162.12',
            Architecture: 'x86_64',
            RootDeviceType: 'ebs',
            RootDeviceName: '/dev/xvda',
            BlockDeviceMappings: [{
              DeviceName: '/dev/xvda',
              Ebs: {
                VolumeId: 'vol-bfc810ad',
                Status: 'attached',
                AttachTime: 'Sat Mar 14 2015 12:06:15 GMT-0700 (PDT)',
                DeleteOnTermination: true
              }
            }],
            VirtualizationType: 'hvm',
            ClientToken: 'sdhf3297rkdflksd',
            Tags: [],
            SecurityGroups: [{
              GroupName: 'my_SG',
              GroupId: 'sg-b30928jsdhfyf3'
            }],
            SourceDestCheck: true,
            Hypervisor: 'xen',
          }]
        }]
      }
    },

  },


  fn: function (inputs,exits) {

    // Dependencies
    var AWS = require('aws-sdk');

    var config = {
      accessKeyId: inputs.accessKeyId,
      secretAccessKey: inputs.secretAccessKey,
      region: inputs.region || 'us-west-2',
      apiVersion: inputs.apiVersion || 'latest'
    };

    // Construct the ECS Service
    var ec2 = new AWS.EC2(config);

    var params = {
      InstanceIds: inputs.instanceIds
    };

    if(inputs.nextToken) params.NextToken = inputs.nextToken;
    if(inputs.maxResults) params.MaxResults = inputs.maxResults;

    ec2.describeInstances(params, function(err, data) {
      if(err) {
        return exits.error(err);
      }

      exits.success(data);
    });


  },



};
