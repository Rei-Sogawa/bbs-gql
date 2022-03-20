import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IUser } from '../lib/entity/user';
import { ITopic } from '../lib/entity/topic';
import { IComment } from '../lib/entity/comment';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  parent: TopicOrComment;
  root: Topic;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type CreateCommentInput = {
  content: Scalars['String'];
  parentId: Scalars['String'];
  rootId: Scalars['String'];
};

export type CreateTopicInput = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: TopicOrComment;
  createTopic: Topic;
  deleteComment: TopicOrComment;
  deleteTopic: Topic;
  signUp: User;
  updateTopic: Topic;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateTopicArgs = {
  input: CreateTopicInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTopicArgs = {
  id: Scalars['ID'];
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateTopicArgs = {
  id: Scalars['ID'];
  input: UpdateTopicInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  topic: Topic;
  topics: Array<Topic>;
};


export type QueryTopicArgs = {
  id: Scalars['ID'];
};

export type SignUpInput = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Topic = {
  __typename?: 'Topic';
  comments: Array<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type TopicOrComment = Comment | Topic;

export type UpdateTopicInput = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String'];
  id: Scalars['ID'];
  topics: Array<Topic>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<IComment>;
  CreateCommentInput: CreateCommentInput;
  CreateTopicInput: CreateTopicInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SignUpInput: SignUpInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Topic: ResolverTypeWrapper<ITopic>;
  TopicOrComment: ResolversTypes['Comment'] | ResolversTypes['Topic'];
  UpdateTopicInput: UpdateTopicInput;
  User: ResolverTypeWrapper<IUser>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Comment: IComment;
  CreateCommentInput: CreateCommentInput;
  CreateTopicInput: CreateTopicInput;
  DateTime: Scalars['DateTime'];
  ID: Scalars['ID'];
  Mutation: {};
  Query: {};
  SignUpInput: SignUpInput;
  String: Scalars['String'];
  Topic: ITopic;
  TopicOrComment: ResolversParentTypes['Comment'] | ResolversParentTypes['Topic'];
  UpdateTopicInput: UpdateTopicInput;
  User: IUser;
}>;

export type CommentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  parent?: Resolver<ResolversTypes['TopicOrComment'], ParentType, ContextType>;
  root?: Resolver<ResolversTypes['Topic'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createComment?: Resolver<ResolversTypes['TopicOrComment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'input'>>;
  createTopic?: Resolver<ResolversTypes['Topic'], ParentType, ContextType, RequireFields<MutationCreateTopicArgs, 'input'>>;
  deleteComment?: Resolver<ResolversTypes['TopicOrComment'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>;
  deleteTopic?: Resolver<ResolversTypes['Topic'], ParentType, ContextType, RequireFields<MutationDeleteTopicArgs, 'id'>>;
  signUp?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'input'>>;
  updateTopic?: Resolver<ResolversTypes['Topic'], ParentType, ContextType, RequireFields<MutationUpdateTopicArgs, 'id' | 'input'>>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  topic?: Resolver<ResolversTypes['Topic'], ParentType, ContextType, RequireFields<QueryTopicArgs, 'id'>>;
  topics?: Resolver<Array<ResolversTypes['Topic']>, ParentType, ContextType>;
}>;

export type TopicResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Topic'] = ResolversParentTypes['Topic']> = ResolversObject<{
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TopicOrCommentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TopicOrComment'] = ResolversParentTypes['TopicOrComment']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Comment' | 'Topic', ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes['Topic']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Comment?: CommentResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Topic?: TopicResolvers<ContextType>;
  TopicOrComment?: TopicOrCommentResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

